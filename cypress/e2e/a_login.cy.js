import credentials from '../fixtures/credentials.json'

context('Login', () => {
  beforeEach(() => {
    cy.fixture('credentials').as('credentials')
    cy.visit('/')
    })
    it('Verify a standard user can log in', () => {
        cy.login(credentials.username, credentials.password)
        cy.url().should('contain', '/inventory')
    })
  })