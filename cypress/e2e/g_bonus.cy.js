import credentials from '../fixtures/credentials.json'

/*
I didn't make it in time to do a proper implementation in a test but
I'm including a draft anyway for your consideration.
*/
function visitElements(domElement, callback) {
    domElement.childNodes.forEach((element) => {
        callback(element);
        if (element.hasChildNodes()) {
            visitElements(element, callback);
        }
        return;
    });
}
context('Bonus', () => {
  beforeEach(() => {
    cy.fixture('credentials').as('credentials')
    cy.visit('/')
    cy.login(credentials.username, credentials.password)
    })
    it('Call recursive function on inventory', () => {
        const dom = document.querySelector('body')
        const callback = (element) => {
            cy.log(element)
        }
        visitElements(dom, callback);
    })
  })