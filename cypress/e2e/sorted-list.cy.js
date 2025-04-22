describe('Sorted List - Agregar 2 objetos nuevos', () => {
    it('debe agregar 2 items y verificar que aparezcan en la lista', () => {
      cy.visit('/sortedList');
  
      // 1. Selectores precisos
      const inputSelector = 'input[type="text"][required]'; // Input
      const addButtonSelector = 'button.form_btn.add'; // Botón
  
      // 2. Datos de prueba
      const itemsToAdd = ['Tarea A', 'Tarea B'];
  
      // 3. Función para agregar un item
      const addItem = (itemText) => {
        cy.get(inputSelector)
          .clear() // Limpiar el input por si acaso
          .type(itemText)
          .should('have.value', itemText); // Verificar que se escribió correctamente
  
        cy.get(addButtonSelector)
          .should('be.visible')
          .click();
  
        // Verificar que el input se vació después de agregar
        cy.get(inputSelector)
          .should('have.value', '');
      };
  
      // 4. Agregar los 2 items
      itemsToAdd.forEach((item) => {
        addItem(item);
      });
  
    });
  });