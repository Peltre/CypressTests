describe('Form Fill - Guardar usuarios en DB', () => {
    before(() => {
      cy.visit('/formFill');
      cy.fixture('users').as('usersData');
    });
  
    it('debe guardar 2 usuarios y validar que se almacenaron', function() {
      const selectors = {
        firstname: 'input[name="firstname"]',
        lastname: 'input[name="lastname"]',
        email: 'input[name="email"]',
        password: 'input[name="password"]',
        saveButton: 'section.btn_section > button.form_btn.add',
        showUsersButton: 'button.form_btn.orange',
        successMessage: 'p.save_message',
        usersTable: 'table.table' // Selector actualizado para la tabla
      };
  
      // Guardar usuarios
      this.usersData.forEach((user) => {
        cy.get(selectors.firstname).type(user.firstname);
        cy.get(selectors.lastname).type(user.lastname);
        cy.get(selectors.email).type(user.email);
        cy.get(selectors.password).type(user.password);
        
        cy.get(selectors.saveButton)
          .should('be.visible')
          .click();
        
        cy.get(selectors.successMessage)
          .should('be.visible')
          .and('contain.text', 'Data saved to DB');
        
        // Limpiar campos
        cy.get(selectors.firstname).clear();
        cy.get(selectors.lastname).clear();
        cy.get(selectors.email).clear();
        cy.get(selectors.password).clear();
      });
  
      // Mostrar usuarios
      cy.get(selectors.showUsersButton)
        .should('be.visible')
        .click();
  
      // Verificar usuarios en la tabla
      cy.get(selectors.usersTable).should('be.visible');
      
      this.usersData.forEach((user) => {
        // Verificar nombre en la primera columna
        cy.get(selectors.usersTable)
          .contains('tr td:first-child', user.firstname)
          .should('exist');
        
        // Verificar email en la segunda columna
        cy.get(selectors.usersTable)
          .contains('tr td:nth-child(2)', user.email)
          .should('exist');
      });
    });
  });