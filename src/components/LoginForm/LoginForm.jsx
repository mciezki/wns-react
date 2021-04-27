import React from 'react';
import Input from '../Inputs/Input';

import './LoginForm.scss';

const LoginForm = ({ register, errors, clear }) => {
    return (
        <>
            <Input
                label="Username"
                type="text"
                placeholder=""
                name="login.username"
                register={register}
                require={true}
                errors={errors && errors.login?.username ? errors.login.username : null}
                message="Incorrect username"
                clear={clear}
            />
            <Input
                label="Password"
                type="password"
                placeholder=""
                name="login.password"
                register={register}
                require={true}
                errors={errors && errors.login?.password ? errors.login.password : null}
                message="Incorrect password"
                clear={clear}
            />
        </>
    )
}

export default LoginForm;