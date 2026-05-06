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

    sleep(1); // Simulate user think time

    const testimonialResponse = postTestimonialRequest(token, Payloads.testimonial);
    sleep(1); // Simulate user think time
    console.log(`Sending payload:`, JSON.stringify(Payloads.testmonial, null, 2));    
    const bodyTestimonial = testimonialResponse.json();
    console.log(`Testimonial response status: ${testimonialResponse.status}`);
    console.log(`Testimonial response body: ${testimonialResponse.body}`);
    console.log(`Parsed testimonial body:`, JSON.stringify(bodyTestimonial, null, 2));

    if (!bodyTestimonial || !bodyTestimonial.data || !bodyTestimonial.data.id) {
        console.error('Testimonial response does not contain expected data.id');
        console.error('Response structure:', bodyTestimonial);
        return;
    }

   // const idTest = bodyTestimonial.data.id;

   // const updateResponse = updateTestimonialRequest(token, idTest, Payloads.updateTestimonial);

   // const deleteResponse = deleteTestimonialRequest(token, idTest);
}