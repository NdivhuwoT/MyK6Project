import http from 'k6/http';
import {URLS} from '../config/urls.js';
import {Headers} from '../config/constants.js';

export function updateTestimonialRequest(token, id, payload) {
    const headers = token ? { ...Headers.json, Authorization: `Bearer ${token}` } : Headers.json;
    const url = URLS.updateTestimonial.replace('${id}', id);
    const body = JSON.stringify(payload);

    return http.put(url, body, { headers });
};