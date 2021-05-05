import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import './Input.scss';


const Input = ({ label, type, placeholder, register, name, require, errors, message, clear, className, containerClass, inputReset }) => {
    const [value, setValue] = useState('');

    const email = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

    const handleValue = (e) => {
        const { value } = e.target;
        clear(name);
        setValue(value);
    }

    useEffect(() => {
        setValue('');
    }, [inputReset])

    return (
        <div className={containerClass ? `input-content ${containerClass}` : "input-content"}>
            <label className="input-label">{label}{require ? <span className="require">*</span> : null}</label>
            {name === "register.email" ?
                <input className={className ? className : null} type={type} placeholder={placeholder} {...register(name, { required: require, pattern: email })} name={name} value={value} onChange={(e) => handleValue(e)} />
                : type === 'select' ?
                    <Form.Control as='select' className={className} {...register(name, { required: require })} name={name}>
                        <option value="technology">technology</option>
                        <option value="life style">life style</option>
                        <option value="games">games</option>
                        <option value="health">health</option>
                        <option value="politics">politics</option>
                        <option value="tragedies">tragedies</option>
                        <option value="fun">fun</option>
                    </Form.Control>
                    : type === 'textarea' ?
                        <textarea className={className ? className : null} type={type} placeholder={placeholder} {...register(name, { required: require, minLength: 100 })} name={name} value={value} onChange={(e) => handleValue(e)} />
                        :
                        <input className={className ? className : null} type={type} placeholder={placeholder} {...register(name, { required: require })} name={name} value={value} onChange={(e) => handleValue(e)} />
            }
            {errors && <span className="error-message">{message}</span>}
        </div>
    )
}

export default Input;