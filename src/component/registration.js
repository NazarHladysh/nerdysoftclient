import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import {PATH} from "./constant"

export class Registration extends React.Component{

    state = {
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        password: undefined,
        cpassword: undefined,
        status: undefined,
        duplicateEmail: undefined,
    };

    setEmail = (e) => {
        this.setState({
            email: e.target.value,
            duplicateEmail: undefined,
        });
    };

    setPassword = (e) => {
        this.setState({
            password: e.target.value,
        });
    };

    setFirstName = (e) => {
        this.setState({ firstName: e.target.value });
    };

    setLastName = (e) => {
        this.setState({ lastName: e.target.value });
    };

    setConfirmPassword = (e) => {
        this.setState({ cpassword: e.target.value });
    };

    insertRegistrationData = (e) => {
        e.preventDefault();
        const data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
        };

        axios.post(`${PATH}registration/`,
            data)
            .then((response) => {
                this.setState({
                    status: response.status,
                    duplicateEmail: undefined,
                });
            })
            .catch((err) => {
                this.setState({duplicateEmail: err.response.data.message, status: err.response.status});
            });
    };

    isValidForm = () => this.state.cpassword === this.state.password
        && this.isEmptyField();

    isEmptyField = () => this.state.firstName !== undefined && this.state.firstName !== ''
        && this.state.lastName !== undefined && this.state.lastName !== ''
        && this.state.email !== undefined && this.state.email !== ''
        && this.state.password !== undefined && this.state.password !== ''
        && this.state.cpassword !== undefined && this.state.cpassword !== '';

    isVisible = () => this.state.status === 200;

    render() {
        return (
            <>
                <div className="container">
                    <div className="card bg-light">
                        <article className="card-body mx-auto" style={{maxWidth: '400px'}}>
                            <h4 className="card-title mt-3 text-center">Create Account</h4>
                            <p className="text-center">Get started with your free account</p>

                            <form>
                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                                    </div>
                                    <input name="" className="form-control" placeholder="First name" type="text" onChange={this.setFirstName}/>
                                </div>

                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                                    </div>
                                    <input name="" className="form-control" placeholder="Second name" type="text" onChange={this.setLastName}/>
                                </div>

                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                                    </div>
                                    <input name="" className="form-control" placeholder="Email address" type="email" onChange={this.setEmail}/>
                                </div>

                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                                    </div>
                                    <input className="form-control" placeholder="Create password" type="password" onChange={this.setPassword}/>
                                </div>

                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                                    </div>
                                    <input className="form-control" placeholder="Repeat password" type="password" onChange={this.setConfirmPassword}/>
                                </div>
                                {
                                    this.state.status === 400
                                    && <div className="alert alert-danger" role="alert">{this.state.duplicateEmail}</div>
                                }
                                <div>
                                    {' '}
                                    {this.isVisible()
                                    && <div className="alert alert-primary" role="alert">Check your mailbox to activate your account</div>}
                                </div>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block" disabled={!this.isValidForm()} onClick={this.insertRegistrationData}> Create Account</button>
                                </div>

                                <p className="text-center">Have an account? <Link to="login">Sign In</Link></p>
                            </form>
                        </article>
                    </div>
                </div>
            </>
        );
    }
}