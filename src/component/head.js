import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Link} from 'react-router-dom';
import {AuthHeader} from './authHeader';

export class Head extends React.Component {

    state = {};


    isAuthorized = () => {
        return localStorage.getItem("JWT") !== null;
    };

    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg" className="d-flex justify-content-between">
                <Navbar.Brand as={Link} to="/">
                    Announcement
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Nav.Link as={Link} to="/announcement">Create Announcement</Nav.Link>
                    </Nav>
                    <Nav className="ml-auto">
                        {this.isAuthorized()
                            ? <AuthHeader/>
                            : <Nav.Link as={Link} to="/login">Log in</Nav.Link>}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
