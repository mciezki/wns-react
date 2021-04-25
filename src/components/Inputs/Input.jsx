import React, { useState } from 'react';
import './Input.scss';


const Input = ({ label, type, placeholder, register, name, require, errors, message }) => {
    const [value, setValue] = useState('');

    const handleValue = (e) => {
        const { value } = e.target;
        setValue(value);
    }

    return (
        <div className="input-content">
            <label className="input-label">{label}</label>
            <input type={type} placeholder={placeholder} {...register(name, { required: require })} name={name} value={value} onChange={(e) => handleValue(e)} />
            {errors && <span>{message}</span>}
        </div>
    )
}

export default Input;