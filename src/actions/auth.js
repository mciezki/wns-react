import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE
} from './types';
import { fetchApi } from '../api/fetchApi';


export const registration = (data) => (dispatch) => {
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
        console.log(response)
        dispatch({
            type: REGISTER_SUCCESS
        });

        dispatch({
            type: SET_MESSAGE,
            payload: response.message
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


export const logout = () => (dispatch) => {
    localStorage.removeItem("user");
    dispatch({
        type: LOGOUT
    })
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
        if (response.accessToken) {
            localStorage.setItem("user", JSON.stringify(response))
        }
        dispatch({
            type: LOGIN_SUCCESS,
            payload: response,
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

