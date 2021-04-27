import React, { useState } from 'react';
import './Input.scss';


const Input = ({ label, type, placeholder, register, name, require, errors, message, clear }) => {
    const [value, setValue] = useState('');

    const email = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

    const handleValue = (e) => {
        const { value } = e.target;
        clear(name);
        setValue(value);
    }

    return (
        <div className="input-content">
            <label className="input-label">{label}{require ? <span className="require">*</span> : null}</label>
            {name === "register.email" ?
                <input type={type} placeholder={placeholder} {...register(name, { required: require, pattern: email })} name={name} value={value} onChange={(e) => handleValue(e)} />
                :
                <input type={type} placeholder={placeholder} {...register(name, { required: require })} name={name} value={value} onChange={(e) => handleValue(e)} />
            }
            {errors && <span className="error-message">{message}</span>}
        </div>
    )
}

export default Input;