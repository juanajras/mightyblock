import credentials from '../fixtures/credentials.json'
import order from '../fixtures/order.json'

context('Sort inventory', () => {
  beforeEach(() => {
    cy.fixture('credentials').as('credentials')
    cy.fixture('order').as('order')
    cy.visit('/')
    cy.login(credentials.username, credentials.password)
    })
    it('Verify the inventory can be sorted by name Z to A', () => {
        cy.getBySel("product_sort_container").select(order.nameDesc)
        cy.get('.inventory_item_name').then($names => {
          const displayedNames = [...$names].map(el => el.innerText)
          const descSorting = Cypress._.sortBy(displayedNames).reverse()
          expect(displayedNames).to.deep.equal(descSorting)

          cy.log("Displayed names: " + displayedNames.join(', '))
          cy.log("Expected sorting: " + descSorting.join(', '))
        })
    })
  })