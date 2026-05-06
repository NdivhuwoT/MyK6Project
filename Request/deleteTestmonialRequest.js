import http from 'k6/http';
import {URLS} from '../config/urls.js';
import {Headers} from '../config/constants.js';

export function deleteTestimonialRequest(token, id) {
    const headers = token ? { ...Headers.json, Authorization: `Bearer ${token}` } : Headers.json;
    const url = URLS.deleteTestimonial.replace('${id}', id);

    return http.delete(url, { headers });
}