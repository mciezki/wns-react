import { API_URL } from '../config';



export const fetchApi = async (path, params) => {
    params.header = {};
    params.header['Content-Type'] = 'application/json';

    if (typeof params.body === 'object') {
        params.body = JSON.stringify(params.body);
    }

    const response = await fetch(API_URL + path, params);
    if (response.status === 401) {
        return fetchApi(path, params)
    } else if (response.ok) {
        return await response.json();
    };
    throw await response.json();
}