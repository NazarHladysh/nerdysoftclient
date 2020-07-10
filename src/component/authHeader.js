import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import axios from 'axios';
import {PATH} from "./constant"

export class AuthHeader extends React.Component {
    state = {
        user: '',
    };

    componentDidMount() {
        this.getUser();
    }

    getUser = () => {
        axios.get(`${PATH}user`,)
            .then(response => this.setState({ user: response.data}));
    };

    deleteJWT = () => {
        localStorage.removeItem("JWT")
    };

    render() {
        return (
            <Dropdown as={NavItem}>
                <Dropdown.Toggle as={NavLink}>{this.state.user.firstName + " " + this.state.user.lastName}</Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-right">
                    <Dropdown.Item as={Link} to="/user/announcement">My announcement</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="/" onClick={this.deleteJWT}>Log out</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

        );
    }
}
