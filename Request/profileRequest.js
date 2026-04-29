import http from 'k6/http';
import {URLS} from '../config/urls.js';
import {Headers} from '../config/constants.js';

export function getprofileRequest(token) {
    const headers = token ? { ...Headers.json, Authorization: 'Bearer ${token}' } : Headers.json;
    const url = URLS.profile;

    return http.get(url, { headers });
}