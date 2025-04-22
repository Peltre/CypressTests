describe('Form Fill - Guardar usuarios en DB', () => {
    before(() => {
      cy.visit('/formFill'); // Ajusta la URL
      cy.fixture('users').as('usersData'); // Carga datos de prueba
    });
  
    it('debe guardar 2 usuarios y validar que se almacenaron', function () {
      // 1. Selectores actualizados (basados en tu HTML)
      const selectors = {
        firstname: 'input[name="firstname"]',
        lastname: 'input[name="lastname"]',
        email: 'input[name="email"]',
        password: 'input[name="password"]',
        saveButton: 'section.btn_section > button.form_btn.add', // Selector preciso
        showUsersButton: 'button.form_btn.orange:contains("Show users in DB")',
        successMessage: 'p.save_message',
        usersList: '.users-list' // Ajusta según tu HTML
      };
  
      // 2. Guardar cada usuario del fixture
      this.usersData.forEach((user) => {
        // Llenar el formulario
        cy.get(selectors.firstname).type(user.firstname);
        cy.get(selectors.lastname).type(user.lastname);
        cy.get(selectors.email).type(user.email);
        cy.get(selectors.password).type(user.password);
  
        // Hacer clic en "Save to db" (con verificación explícita)
        cy.get(selectors.saveButton)
          .should('be.visible')
          .and('contain.text', 'Save to db') // Verifica el texto exacto
          .click();
  
        // Verificar mensaje de éxito
        cy.get(selectors.successMessage)
          .should('be.visible')
          .and('contain.text', 'Data saved to DB');
  
        // Limpiar el formulario
        cy.get(selectors.firstname).clear();
        // ... limpia los demás campos
      });
  
      // 3. Validar datos en la DB
      cy.get(selectors.showUsersButton)
      .should('exist') // Verifica que el elemento existe en el DOM
      .and('be.visible') // Verifica que no está oculto
      .and('not.be.disabled') // Verifica que no está deshabilitado
      .click();

    // 4. Verificar que los usuarios aparecen en la lista
    this.usersData.forEach((user) => {
      cy.get(selectors.usersList)
        .should('contain', user.firstname)
        .and('contain', user.email);
    });
    });
  });