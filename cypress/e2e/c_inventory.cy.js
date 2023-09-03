import credentials from '../fixtures/credentials.json'

context('Inventory', () => {
  beforeEach(() => {
    cy.fixture('credentials').as('credentials')
    cy.visit('/')
    cy.login(credentials.username, credentials.password)
    })
    it('Verify the inventory page lists by default six items', () => {
        cy.get('.inventory_list').children().should('have.length', 6)
    })
  })