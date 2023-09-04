import credentials from '../fixtures/credentials.json'
import userdata from '../fixtures/userdata.json'
import content from '../fixtures/content.json'

context('Checkout', () => {
  beforeEach(() => {
    cy.fixture('credentials').as('credentials')
    cy.fixture('userdata').as('userdata')
    cy.fixture('content').as('content')
    cy.visit('/')
    cy.login(credentials.username, credentials.password)
    })
    it('Verify the user can complete a purchase', () => {
        cy.getBySel("add-to-cart-sauce-labs-backpack").click()
        cy.get('.shopping_cart_link').click()
        cy.getBySel("checkout").click()
        cy.url().should('contain', '/checkout-step-one')
        cy.fillCheckoutForm(userdata.firstName, userdata.lastName, userdata.postalCode)
        cy.url().should('contain', '/checkout-step-two')
        cy.getBySel("finish").click()
        cy.url().should('contain', '/checkout-complete')
        cy.get('.title').should('have.text', content.checkoutTitle)
        cy.get('.pony_express').should('be.visible')
        cy.get('.complete-header').should('have.text', content.checkoutHeader)
        cy.get('.complete-text').should('contain', content.checkoutText)
        cy.getBySel("back-to-products").click()
        cy.url().should('contain', '/inventory')
    })
  })