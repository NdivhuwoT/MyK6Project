import http from 'k6/http';
import { Test_Config } from '../config/constants.js';
import {Payloads} from '../Data/payloads.js';
import {loginRequest} from '../Request/authRequest.js';
import {getprofileRequest} from '../Request/profileRequest.js';
import {postTestimonialRequest} from '../Request/postTestmonialRequest.js';
import {updateTestimonialRequest} from '../Request/updateTestmonial.js';
import {deleteTestimonialRequest} from '../Request/deleteTestmonialRequest.js';
import {validateLoginResponse} from '../checks/authChecks.js';
import { sleep } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

export const options = {
    vus: Test_Config.vus,
    duration: Test_Config.duration,
};

export default function () {
    const loginResponse = loginRequest(Payloads.login);
    validateLoginResponse(loginResponse);

    const body = loginResponse.json();
    const token = body.data.token;
    console.log(`Extracted token: ${token}`);


    const testimonialResponse = postTestimonialRequest(token, Payloads.testimonial);
    console.log(`Sending payload:`, JSON.stringify(Payloads.testimonial, null, 2));    
    const bodyTestimonial = testimonialResponse.json();
    console.log(`Testimonial response status: ${testimonialResponse.status}`);
    console.log(`Testimonial response body: ${testimonialResponse.body}`);
    console.log(`Parsed testimonial body:`, JSON.stringify(bodyTestimonial, null, 2));

    if (!bodyTestimonial || !bodyTestimonial.data || !bodyTestimonial.data.Id) {
        console.error('Testimonial response does not contain expected data.Id');
        console.error('Response structure:', bodyTestimonial);
        return;
    }

    const idTest = bodyTestimonial.data.Id;

    const updateResponse = updateTestimonialRequest(token, idTest, Payloads.updateTestimonial);
    console.log(`Update testimonial response status: ${updateResponse.status}`);
    console.log(`Update testimonial response body: ${updateResponse.body}`);

    const deleteResponse = deleteTestimonialRequest(token, idTest);
    console.log(`Delete testimonial response status: ${deleteResponse.status}`);
    console.log(`Delete testimonial response body: ${deleteResponse.body}`);
}

export function handleSummary(data) {
  return {
    'report.html': htmlReport(data),
    'report.json': JSON.stringify(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}