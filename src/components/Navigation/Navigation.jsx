import React, { useState } from 'react';
import { NavLink, BrowserRouter as Router } from 'react-router-dom';
import { Navbar, Nav, Button, Modal } from 'react-bootstrap';
import logo from '../../assets/logo.svg';
import { fetchApi } from '../../api/fetchApi';
import { useWindowWidthAndHeight } from '../../hooks/responsiveHook';

import LoginForm from '../LoginForm/LoginForm';

import './Navigation.scss';

const Navigation = () => {
    const [show, setShowModal] = useState(false);
    const [width, height] = useWindowWidthAndHeight();

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);


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
                        <Button variant="primary" onClick={handleShow}>
                            Login
                        </Button>
                        : <a onClick={handleShow}>Login</a>}
                </Navbar.Collapse>
            </Navbar>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LoginForm />
                </Modal.Body>
                <Modal.Footer>
                    <NavLink to="/register" onClick={handleClose}>No account? Register now!</NavLink>
                    <Button variat="primary" onClick={handleClose}>Login</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Navigation;