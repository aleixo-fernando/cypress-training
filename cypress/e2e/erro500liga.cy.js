Cypress.Commands.add('monitorOnly500Errors', () => {
    // Intercept all network requests
    cy.intercept('**', (req) => {
      req.on('response', (res) => {
        if (res.statusCode === 500) {
          // Only log 500 errors
          cy.log(`500 Error: ${req.method} ${req.url}`);
          console.error(`500 Error: ${req.method} ${req.url}`, res);
        }
      });
    });
  
    // Suppress all other console logs
    Cypress.on('window:before:load', (win) => {
      win.console.log = () => {}; // Suppress console.log
      win.console.info = () => {}; // Suppress console.info
      win.console.warn = () => {}; // Suppress console.warn
    });
  });

Cypress.Commands.add('monitor500Errors', () => {
    cy.intercept('**', (req) => {
      req.on('response', (res) => {
        if (res.statusCode === 500) {
          cy.log(`500 Error: ${req.method} ${req.url}`);
          console.error(`500 Error: ${req.method} ${req.url}`, res);
        }
      });
    });
  });

  describe('Intercept 500 Errors', () => {
    beforeEach(() => {
        cy.monitorOnly500Errors();
      cy.monitor500Errors(); // Start monitoring for 500 errors
    });
  
    it('should not produce any 500 errors', () => {
      var ednumb=641
      while(ednumb>1){
      cy.visit(`https://www.ligapokemon.com.br/?view=cards/search&card=edid=${ednumb}%20ed=SVM`);
      // Replace with the page you want to test
      // Add your test steps here
      ednumb--
    }
    });
  });