import React from 'react';
import { NavLink } from 'react-router-dom';
import { fetchApi } from '../../api/fetchApi';

import './LoginForm.scss';

const LoginForm = () => {
    return (
        <>
            <label>Login</label>
            <input type="text" />
            <br />
            <label htmlFor="">Hasło</label>
            <input type="password" />
        </>
    )
}

export default LoginForm;