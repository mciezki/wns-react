import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import { Navbar, Nav, Button, Modal } from 'react-bootstrap';
import logo from '../../assets/logo.svg';
import { login } from '../../actions/auth';
import { useWindowWidthAndHeight } from '../../hooks/responsiveHook';
import { useForm } from "react-hook-form";

import LoginForm from '../LoginForm/LoginForm';

import './Navigation.scss';

const Navigation = () => {
    const history = useHistory();

    const [show, setShowModal] = useState(false);
    const [width, height] = useWindowWidthAndHeight();

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const { register, handleSubmit, clearErrors, formState: { errors } } = useForm();

    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();

    const logIn = (data, e) => {
        e.preventDefault();
        console.log(e);
        console.log(data.login)
        dispatch(login(data.login))
            .then((res) => {
                console.log(res);
                console.log(isLoggedIn)
            })
            .catch(() => console.log('Bład, funkcja nie działa'));
        // handleClose();
    };


    return (
        <>
            <Navbar bg='dark' expand='lg' variant='dark'>
                <NavLink to="/">
                    <Navbar.Brand>
                        <img
                            alt="logo"
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                World News Service
            </Navbar.Brand>
                </NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/articles">Articles</NavLink>
                    </Nav>
                    {width > 992 ?
                        <>
                            <Button variant="primary" onClick={() => history.push('/register')}>
                                Register
                        </Button>
                            <Button variant="primary" onClick={handleShow}>
                                Login
                        </Button>
                        </>
                        :
                        <>
                            <NavLink to="/register">Register</NavLink>
                            <a onClick={handleShow}>Login</a>
                        </>
                    }
                </Navbar.Collapse>
            </Navbar>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleSubmit(logIn)}>
                    <Modal.Body>
                        <LoginForm register={register} errors={errors} clear={clearErrors} />
                    </Modal.Body>
                    <Modal.Footer>
                        <NavLink to="/register" onClick={handleClose}>No account? Register now!</NavLink>
                        <Button variat="primary" type="submit">Login</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}

export default Navigation;