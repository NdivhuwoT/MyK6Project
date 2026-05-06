import http from 'k6/http';
import {URLS} from '../config/urls.js';
import {Headers} from '../config/constants.js';

export function postTestimonialRequest(token, payload) {
    const headers = token ? { ...Headers.json, Authorization: `Bearer ${token}` } : Headers.json;
    const url = URLS.testimonial;
    const body = JSON.stringify(payload);

    return http.post(url, body, { headers });
};

