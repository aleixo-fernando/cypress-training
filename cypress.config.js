const { defineConfig } = require('cypress');
const installLogsCollector = require('cypress-terminal-report/src/installLogsCollector');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {

     },
  },
});