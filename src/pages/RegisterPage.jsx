import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Button, Alert } from 'react-bootstrap';
import { registration } from '../actions/auth';
import {
    CLEAR_MESSAGE
} from '../actions/types';

import './RegisterPage.scss';

import Input from '../components/Inputs/Input';

const RegisterPage = () => {
    const history = useHistory();
    const { register, handleSubmit, clearErrors, formState: { errors } } = useForm();

    const dispatch = useDispatch();
    const { message } = useSelector(state => state.message);

    useEffect(() => {
        if (message === 'User was registered successfully. You can log in.')
            setTimeout(() => {
                dispatch({
                    type: CLEAR_MESSAGE,
                });
                history.push('/')
            }, 3000);
    }, [message])

    const onSubmit = async (data) => {
        console.log(data.register)
        await dispatch(registration(data.register))
            .catch(() => console.log('Error'));
    };

    return (
        <div className='register-content'>
            <h3 className='register-header'>Register</h3>
            {!message ? null :
                <Alert variant={message === 'User was registered successfully. You can log in.' ? 'success' : 'danger'}>
                    {message}
                </Alert>
            }
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    label="Username"
                    type="text"
                    placeholder=""
                    name="register.username"
                    register={register}
                    require={true}
                    errors={errors && errors.register?.username ? errors.register.username : null}
                    message="Incorrect username"
                    clear={clearErrors}
                />
                <Input
                    label="E-mail"
                    type="text"
                    placeholder=""
                    name="register.email"
                    register={register}
                    require={true}
                    errors={errors && errors.register?.email ? errors.register.email : null}
                    message="Incorrect e-mail address"
                    clear={clearErrors}
                />
                <Input
                    label="Password"
                    type="password"
                    placeholder=""
                    name="register.password"
                    register={register}
                    require={true}
                    errors={errors && errors.register?.password ? errors.register.password : null}
                    message="Incorrect password"
                    clear={clearErrors}
                />
                <Input
                    label="First Name"
                    type="text"
                    placeholder=""
                    name="register.firstName"
                    register={register}
                    require={false}
                    errors={errors && errors.register?.firstName ? errors.register.firstName : null}
                    message="Incorrect first name"
                    clear={clearErrors}
                />
                <Input
                    label="Surname"
                    type="text"
                    placeholder=""
                    name="register.surname"
                    register={register}
                    require={false}
                    errors={errors && errors.register?.surname ? errors.register.surname : null}
                    message="Incorrect surname"
                    clear={clearErrors}
                />
                <Button type='submit'>Register</Button>
            </form>
        </div>
    )
}

export default RegisterPage;