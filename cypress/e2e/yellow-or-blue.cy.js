describe('Yellow or Blue logical game', () => {
    it('debe hacer clic en el botón que coincide con el color generado', () => {
      cy.visit('/yellowOrBlue');
  
      // 1. Generar el color
      cy.contains('button', 'Generate Color').click();
  
      // 2. Leer el color generado 
      cy.get('[data-testid="output"] .color')
        .invoke('text')
        .then((colorText) => {
          const targetColor = colorText.trim().toLowerCase(); // "blue" o "yellow"
          cy.log(`Color generado: ${targetColor}`);
  
          // 3. Hacer clic en el botón correspondiente
          cy.get(`button.${targetColor}`)
            .should('be.visible')
            .click();
  
          // 4. Verificar el mensaje de éxito
          cy.get('[data-testid="message"]').should('contain', 'Success');
        });
    });
  });