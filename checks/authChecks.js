import {check} from 'k6';

export function validateLoginResponse(response) {
    return check(response, {
        'is status 200': (r) => r.status === 200,
        'body is not empty': (r) => r.body.length > 0,
        
    });
}