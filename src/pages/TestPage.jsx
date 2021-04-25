import React from 'react';
import { useForm } from "react-hook-form";
import Input from '../components/Inputs/Input';
import { fetchApi } from '../api/fetchApi';

const TestPage = () => {
    const { register, handleSubmit, clearErrors, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data)
        clearErrors()
    };

    console.log("errors: ", errors)

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input
                label="test"
                type="text"
                placeholder="login"
                name="login.test"
                register={register}
                require={true}
                errors={errors && errors.login?.test ? errors.login.test : null}
                message="Nazwa użytkownika jest wymagana"
            />
            <Input
                label="test2"
                type="password"
                placeholder="password"
                name="login.testPassword"
                register={register}
                require={true}
                errors={errors && errors.login?.testPassword ? errors.login.testPassword : null}
                message="Wprowadż właściwe hasło"
            />
            <input type="submit" />
        </form>
    )
}

export default TestPage;