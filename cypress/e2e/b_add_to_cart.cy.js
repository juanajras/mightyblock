import credentials from '../fixtures/credentials.json'

context('Add to cart', () => {
  beforeEach(() => {
    cy.fixture('credentials').as('credentials')
    cy.visit('/')
    cy.login(credentials.username, credentials.password)
    })
    it('Verify an item can be added to the cart', () => {
        cy.getBySel("add-to-cart-sauce-labs-backpack").click()
        cy.getBySel("remove-sauce-labs-backpack").should('be.visible')
        cy.get('.shopping_cart_badge').should('have.text', '1')
        cy.get('.shopping_cart_link').click()
        cy.get('.cart_quantity').should('be.visible').and('have.text', '1')
        cy.get('.inventory_item_name').should('be.visible').and('have.text', 'Sauce Labs Backpack')
    })
  })