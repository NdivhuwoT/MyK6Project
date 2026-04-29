import http from 'k6/http';
import { Test_Config } from '../config/constants.js';
import {Payloads} from '../Data/payloads.js';
import {loginRequest} from '../Request/authRequest.js';
import {validateLoginResponse} from '../checks/authChecks.js';
import { sleep } from 'k6';

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


