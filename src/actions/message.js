import { SET_MESSAGE, CLEAR_MESSAGE } from './types';

export const setMessage = (message) => ({
    type: SET_MESSAGE,
    payload: message,
});

export const cleanMessage = () => ({
    type: CLEAR_MESSAGE,
});