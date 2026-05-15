import http from 'k6/http';
import { Test_Config } from '../config/constants.js';
import {Payloads} from '../Data/payloads.js';
import {loginRequest} from '../Request/authRequest.js';
import {validateLoginResponse} from '../checks/authChecks.js';
import { sleep } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

export const options = {
    vus: Test_Config.vus,
    duration: Test_Config.duration,
};

export default function () {
    const response = loginRequest(Payloads.login);
    console.log(`Login response status: ${response.status}`);
    console.log(`Login response body: ${response.body}`);  
    validateLoginResponse(response);
}

export function handleSummary(data) {
  return {
    'report.html': htmlReport(data),
    'report.json': JSON.stringify(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}


