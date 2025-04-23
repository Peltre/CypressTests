describe('Concat Strings - Generar y enviar', () => {
    it('debe generar dos palabras, concatenarlas y enviarlas correctamente', () => {
      // Visitar la página
      cy.visit('/concatstrings');
  
      // Click en el botón "Generate strings"
      cy.contains('button.form_btn.add', 'Generate strings').click();
  
      // Capturar las dos palabras generadas
      cy.get('p.string1').invoke('text').then((string1) => {
        cy.get('p.string2').invoke('text').then((string2) => {
          const concatenated = `${string1}${string2}`;
  
          // Escribir el resultado concatenado en el input
          cy.get('input[name="strings"]').clear().type(concatenated);
  
          // Dar clic en el botón "Submit string"
          cy.contains('button.form_btn.add', 'Submit string').click();
  
          // Verificar si aparece el texto "Success"
          cy.contains('Success').should('be.visible');
        });
      });
    });
  });
  