import { API_URL } from '../config';


export const fetchApi = async (path, params, token) => {
    params.headers = {};
    params.headers['Content-Type'] = 'application/json';

    if (token) {
        params.headers['x-access-token'] = token;
    }

    if (typeof params.body === 'object') {
        params.body = JSON.stringify(params.body);
    }

    console.log(params)

    const response = await fetch(API_URL + path, params);
    if (response.status === 401) {
        throw new Error('Check your password or try again later.')
    } else if (response.ok) {
        return await response.json();
    };
    throw await response.json();
}