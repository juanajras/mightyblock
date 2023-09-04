// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/**GLOBAL**/
Cypress.Commands.add("getBySel", (selector, ...args) => {
    return cy.get(`[data-test=${selector}]`, ...args);
});

Cypress.Commands.add('getBySelLike', (selector, ...args) => {
    return cy.get(`[data-test*=${selector}]`, ...args)
})

/**FORMS**/
Cypress.Commands.add('login', (username, password) => {
    cy.getBySel("username").type(username).should('have.value', username)
    cy.getBySel("password").type(password).should('have.value', password)
    cy.getBySel("login-button").click()
})

Cypress.Commands.add('fillCheckoutForm', (firstName, lastName, postalCode) => {
    cy.getBySel("firstName").type(firstName)
    cy.getBySel("lastName").type(lastName)
    cy.getBySel("postalCode").type(postalCode)
    cy.getBySel("continue").click()
})