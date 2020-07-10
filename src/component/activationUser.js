import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {PATH} from "./constant"

export class ActivationUser extends React.Component {
    state = {
        status: undefined,
        errorMessage: undefined,
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        axios.get(`${PATH}registration/activationUser?activationCode=${this.props.match.params.activationCode}`)
            .then((response) => {
                this.setState({ status: response.status });
            })
            .catch((err) => {
                this.setState({ errorMessage: err.response.data.message });
            });
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.errorMessage
                    && (
                        <div className="alert alert-danger" style={{margin: '10px auto', textAlign: 'center'}} role="alert">
                            {' '}
                            Wrong url, try again!
                            {' '}
                            {this.state.errorMessage}
                        </div>
                    )
                    }
                </div>
                <div>{this.state.status === 200 && <Redirect to="/login" />}</div>
            </div>
        );
    }
}
