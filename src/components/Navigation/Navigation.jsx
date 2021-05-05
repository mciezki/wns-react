import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from 'react-router-dom';
import { Navbar, Nav, Button, Modal, Alert, Dropdown, DropdownButton } from 'react-bootstrap';
import logo from '../../assets/logo.svg';
import { login, logout } from '../../actions/auth';
import { useWindowWidthAndHeight } from '../../hooks/responsiveHook';
import { useForm } from "react-hook-form";
import {
    CLEAR_MESSAGE
} from '../../actions/types';

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
    const { user } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isLoggedIn) {
            setTimeout(() => {
                dispatch({
                    type: CLEAR_MESSAGE,
                });
                handleClose();
                history.push('/');
            }, 1500);
        }
    }, [isLoggedIn])


    const logIn = (data, e) => {
        e.preventDefault();
        console.log(data.login)
        dispatch(login(data.login))
            .catch(() => console.log('Bład, funkcja nie działa'));
    };

    const logOut = (e) => {
        e.preventDefault();
        dispatch(logout());
        history.push('/');
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
                        <NavLink className="basic-nav" exact to="/">Home</NavLink>
                        <NavLink className="basic-nav" exact to="/articles">Articles</NavLink>
                    </Nav>
                    {user ?
                        width > 992 ?
                            <DropdownButton menuAlign="right" variant="primary" id="dropdown-menu-align-right" title={user.username}>
                                <Dropdown.Header>Your world</Dropdown.Header>
                                <Dropdown.Item onClick={() => history.push(`/profile/${user.id}`)}>Profile</Dropdown.Item>
                                <Dropdown.Item onClick={() => history.push('/articles/add')}>Add Article</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={logOut}>Logout</Dropdown.Item>
                            </DropdownButton>
                            :
                            <>
                                <NavLink className="nav-item" to={`/profile/${user.id}`}>Profile</NavLink>
                                <NavLink className="nav-item" to='/article/add'>Add Article</NavLink>
                                <a className="nav-item" onClick={logOut}>Logout</a>
                            </>
                        :
                        width > 992 ?
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
                                <NavLink className="nav-item" to="/register">Register</NavLink>
                                <a className="nav-item" onClick={handleShow}>Login</a>
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
                        {message ?
                            <Alert variant='danger'>
                                {message}
                            </Alert>
                            : isLoggedIn ?
                                <Alert variant='success'>
                                    You logged successfully!
                                </Alert>
                                : null
                        }
                        <LoginForm register={register} errors={errors} clear={clearErrors} />
                    </Modal.Body>
                    <Modal.Footer>
                        <NavLink className="register-link" to="/register" onClick={handleClose}>No account? Register now!</NavLink>
                        <Button variat="primary" type="submit">Login</Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}

export default Navigation;