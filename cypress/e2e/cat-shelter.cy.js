describe('Cat Shelter - Agregar gatos y asignar hogar', () => {
    before(() => {
      cy.visit('/catshelter');
      cy.fixture('cats').as('catsData');
    });
  
    it('debe agregar gatos y marcarlos como adoptados individualmente', function () {
      const selectors = {
        addCatButton: 'header.cat_shelter_header > a.link_btn.add',
        nameInput: 'input[name="name"]',
        descriptionInput: 'textarea[name="description"]',
        outsideRadio: 'input[value="outside"]',
        insideRadio: 'input[value="inside"]',
        submitButton: 'button.form_btn.add',
        catCollection: 'ul.collection',
        catItem: 'li.collection_item',
        catName: 'a.cat_name_link span',
        homeButton: 'button.new_home'
      };
  
      // Agregar todos los gatos
      this.catsData.forEach((cat) => {
        cy.get(selectors.addCatButton).click();
        cy.url().should('include', '/addcat');
  
        cy.get(selectors.nameInput).type(cat.name);
        cy.get(selectors.descriptionInput).type(cat.description);
  
        const radio = cat.preference === 'outside' ? selectors.outsideRadio : selectors.insideRadio;
        cy.get(radio).check({ force: true });
  
        cy.get(selectors.submitButton).click();
        cy.url().should('include', '/catshelter');
      });
  
      // Marcar cada gato como adoptado y verificar individualmente
      this.catsData.forEach((cat) => {
        cy.contains(selectors.catItem, cat.name).within(() => {
          cy.get(selectors.homeButton).click();
          cy.get(`${selectors.homeButton} i`).should('have.attr', 'title', 'Found home');
        });
      });
    });
  });
  