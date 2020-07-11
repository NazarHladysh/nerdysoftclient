import React from "react";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import {PATH} from "./constant"

export class EditAnnouncement extends React.Component {

    state = {
        id: '',
        title: '',
        description: ''
    }

    setTitle = (title) => {
        this.setState({title: title.target.value});
    };

    setDescription = (description) => {
        this.setState({description: description.target.value});
    };

    fetchData = () => {
        axios.get(`${PATH}announcement/${this.props.location.id}`)
            .then(response => this.setState({
                id: response.data.id,
                title: response.data.title,
                description: response.data.description
            }))
            .catch(err => {
                this.setState({errorMessage: err.response.data.message})
            })
    }

    updateAnnouncement = () => {
        axios.put(`${PATH}announcement`, this.state)
            .then(window.location.replace('https://nerdysoftclient.herokuapp.com/user/announcement'))
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        return (
            <>
                <Container>
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Title style={{textAlign: 'center'}}>Update Announcement</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Form>
                                <Form.Label>
                                    Title
                                </Form.Label>
                                <Form.Control onChange={this.setTitle} type="text" placeholder="Title..."
                                              defaultValue={this.state.title}/>
                                <Form.Label>
                                    Description
                                </Form.Label>
                                <Form.Control onChange={this.setDescription} as="textarea"
                                              placeholder="Description..."
                                              defaultValue={this.state.description}/>
                            </Form>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="primary" onClick={this.updateAnnouncement}>Send</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Container>
            </>
        )
    }
}