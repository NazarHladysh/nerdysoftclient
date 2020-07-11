import React from "react";
import {Link} from "react-router-dom";
import axios from "axios"
import {PATH} from "./constant"

export class Login extends React.Component {
    state = {
        email: undefined,
        password: undefined,
        status: undefined,
        errorMessage: undefined,
    };

    setEmail = (email) => {
        this.setState({email: email.target.value});
    };

    setPassword = (pass) => {
        this.setState({password: pass.target.value});
    };

    insertLoginData = (e) => {
        e.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password,
        };
        axios.post(`${PATH}login`, data, {withCredentials: true})
            .then((response) => {
                localStorage.setItem("JWT", response.data.Authorization)
                this.setState({
                    status: response.status,
                });
            })
            .then(() => window.location.replace('https://nerdysoftclient.herokuapp.com/'))
            .catch((err) => {
                this.setState({status: err.response.status});
            });
    };

    isEmptyField = () => this.state.email !== undefined && this.state.email !== ''
        && this.state.password !== undefined && this.state.password !== '';

    render() {
        return (
            <>
                <div className="container">
                    <div className="card bg-light">
                        <article className="card-body mx-auto" style={{maxWidth: '400px'}}>
                            <h4 className="card-title mt-3 text-center">Sign In</h4>
                            <form>

                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                                    </div>
                                    <input name="" className="form-control" placeholder="Email address" type="email"
                                           onChange={this.setEmail}/>
                                </div>

                                <div className="form-group input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"> <i className="fa fa-lock"></i> </span>
                                    </div>
                                    <input className="form-control" placeholder="Password" type="password"
                                           onChange={this.setPassword}/>
                                </div>


                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary btn-block"
                                            onClick={this.insertLoginData}>Sign in
                                    </button>
                                </div>
                                <div>
                                    {
                                        !this.isEmptyField()
                                        && <div className="alert alert-primary" role="alert"
                                                style={{textAlign: 'center'}}>All fields must be filled</div>
                                    }
                                    {
                                        this.state.status === 403
                                        && <div className="alert alert-danger" role="alert">Password incorrect</div>
                                    }
                                </div>
                                <p className="text-center">Don't have an account? <Link to="registration">Sign up</Link>
                                </p>
                            </form>
                        </article>
                    </div>
                </div>
            </>
        );
    }
}