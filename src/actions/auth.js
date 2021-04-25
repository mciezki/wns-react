import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE
} from './types';
import { fetchApi } from '../api/fetchApi';


export const register = (data) => (dispatch) => {
    const { username, email, password, firstName, surname } = data;
    return fetchApi('/api/auth/signup', {
        method: "POST",
        body: {
            username,
            email,
            password,
            firstName,
            surname
        }
    }).then(response => {
        dispatch({
            type: REGISTER_SUCCESS
        });

        dispatch({
            type: SET_MESSAGE,
            payload: response.data.message
        });
    })
        .catch(error => {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            dispatch({ type: REGISTER_FAIL });
            dispatch({
                type: SET_MESSAGE,
                payload: message
            });
        });
};


export const logout = () => {
    localStorage.removeItem("user");
};


export const login = (data) => (dispatch) => {
    const { username, password } = data;
    return fetchApi('/api/auth/signin', {
        method: "POST",
        body: {
            username: username,
            password: password
        }
    }).then(response => {
        console.log(response)
        if (response.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(response.data))
        }
    }).then(data => {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: { user: data },
        });
    })
        .catch(error => {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            console.log(message)
            dispatch({ type: LOGIN_FAIL });
            dispatch({
                type: SET_MESSAGE,
                payload: message
            });
        });
}

