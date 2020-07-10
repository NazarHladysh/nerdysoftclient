import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button";
import axios from "axios";
import {PATH} from "./constant"

export class CreateAnnouncement extends React.Component {

    state = {
        title: '',
        description: ''
    }

    setTitle = (title) => {
        this.setState({title: title.target.value});
    };

    setDescription = (description) => {
        this.setState({description: description.target.value});
    };

    postAnnouncement = () => {
        axios.post(`${PATH}announcement`, this.state)
            .then(response => {
                if(response.status === 200) {
                    window.location.replace('http://localhost:3000/')
                }
            }).catch(error => {
                alert("Oops something went wrong");
            }
        )
    }

    render() {
        return (
            <>
                <Container>
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Title style={{textAlign: 'center'}}>Create Announcement</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Form>
                                <Form.Label>
                                    Title
                                </Form.Label>
                                <Form.Control onChange={this.setTitle} type="text" placeholder="Title..."/>
                                <Form.Label>
                                    Description
                                </Form.Label>
                                <Form.Control onChange={this.setDescription} as="textarea"
                                              placeholder="Description..."/>
                            </Form>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="primary" onClick={this.postAnnouncement}>Send</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Container>
            </>
        )
    }
}