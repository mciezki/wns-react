import React from 'react';
import Input from '../Inputs/Input';

import './LoginForm.scss';

const LoginForm = ({ register, errors }) => {
    return (
        <>
            <Input
                label="Nazwa użytkownika"
                type="text"
                placeholder=""
                name="login.username"
                register={register}
                require={true}
                errors={errors && errors.login?.username ? errors.login.username : null}
                message="Wprowadź poprawną nazwę użytkownika"
            />
            <Input
                label="Hasło"
                type="password"
                placeholder=""
                name="login.password"
                register={register}
                require={true}
                errors={errors && errors.login?.password ? errors.login.password : null}
                message="Wprowadż właściwe hasło"
            />
        </>
    )
}

export default LoginForm;