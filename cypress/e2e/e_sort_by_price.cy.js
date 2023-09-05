import credentials from '../fixtures/credentials.json'
import order from '../fixtures/order.json'

context('Sort inventory', () => {
  beforeEach(() => {
    cy.fixture('credentials').as('credentials')
    cy.fixture('order').as('order')
    cy.visit('/')
    cy.login(credentials.username, credentials.password)
    })
    it('Verify the inventory can be sorted by price high to low', () => {
        cy.getBySel("product_sort_container").select(order.priceDesc)
          cy.get('.inventory_item_price').then(($prices) => {
            const innerText = (el) => el.innerText
            const digits = (str) => str.replace(/[^0-9.]/g, '')
            const displayedPrices = Cypress._.map($prices, (el) =>
              parseFloat(digits((innerText(el))))
            )
            const descSorting = Cypress._.sortBy(displayedPrices).reverse()
            expect(displayedPrices).to.deep.equal(descSorting)

            cy.log("Displayed prices: " + displayedPrices.join(', '))
            cy.log("Expected sorting: " + descSorting.join(', '))
          })
    })
  })