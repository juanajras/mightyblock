const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  video: false,
  reporterOptions: {
  charts: true,
  reportPageTitle: 'Cypress Inline Reporter',
  embeddedScreenshots: true,
  inlineAssets: true
  },
  e2e: {
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    baseUrl: 'https://www.saucedemo.com'
  },
});
