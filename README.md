# Mighty Block technical challenge
Automated UI and API tests submitted for assessment by Mighty Block, targeting:

* UI: [Swag Labs demo site](https://pages.github.com/)
* API: [Restful-Booker](https://restful-booker.herokuapp.com/apidoc/index.html)

## Tech Stack
* Cypress 13.1.0
* Node.js 20.5.1
* cypress-mochawesome-reporter 3.5.1

## How to run
### From the command line
 Run the whole suite in headless mode:

````shell
npm run test
````
Run a specific test in headless mode:

````shell
npm run spec -<path to file>
````
_Example: `npm run spec -cypress/e2e/a_login.cy.js`_

### From Cypress UI

````shell
npm run open
````
_Navigate to 'specs' and double-click a test from the list_

## Report
Running tests in headless mode as indicated above will generate a shareable HTML report named `index.html` inside the `cypress/reports` folder, which in turn is created the first time a test runs. This interactive report contains the results from the run along with other useful information and can be opened in any browser.