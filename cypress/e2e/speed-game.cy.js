describe("Speed Game", () => {
  it("should complete the speed game and show success message", () => {
    cy.visit("/speedGame");

    // esperar a que aparezca el boton de start game y clickearlo
    cy.contains("button", /Start Game/i).click({ force: true });

    // Esperar para que el boton de end game aparezca
    cy.wait(500);

    // hacer click en el boton de end game con timeout para esperar los 5 segundos a que aparezca
    cy.contains("button", /End Game/i, { timeout: 5000 })
      .should('be.visible')
      .click();

    // mensaje de exito
    cy.contains(/Success/i).should("be.visible");
    cy.contains(/Your reaction time is \d+ ms/i).should("exist");

    // Tomar el tiempo de reacción e imprimirlo
    cy.contains(/Your reaction time is \d+ ms/i).then(($el) => {
      const reactionTime = parseInt($el.text().match(/\d+/)[0]);
      cy.log(`Reaction time: ${reactionTime} ms`);
      expect(reactionTime).to.be.greaterThan(0);
    });
  });
});