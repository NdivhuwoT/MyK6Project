const { generateSummaryReport } = require('k6-html-reporter');

generateSummaryReport(__dirname + '/report.json', __dirname + '/report.html', { title: 'K6 Test Report' });