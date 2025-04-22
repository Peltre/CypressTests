describe('Wait Game - Two Buttons', () => {
    it('should show success when clicking End Game after 5+ seconds', () => {
      cy.visit('/waitGame');
  
      // 1. hacer click en el boton de start
      cy.contains('button', 'Start Game', { timeout: 5000 })
        .should('be.visible')
        .as('startBtn')
        .click();
  
      // 2. esperar mas de 5 segundos
      cy.wait(5100);
  
      // 3. hacer click en el boton de end game
      cy.contains('button', 'End Game')
        .should('be.visible')
        .click();
  
      // 4. verificar exito
      cy.contains(/Success/i, { timeout: 2000 })
        .should('be.visible');
  
      // 5. mostrar tiempo sobre 5 segundos
      cy.contains(/\d+ ms/i)
        .invoke('text')
        .then((timeText) => {
          const recordedTime = parseInt(timeText);
          cy.log(`Recorded wait time: ${recordedTime}ms above five seconds`);
          
        });
    });
  });