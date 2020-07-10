import React from "react";
import Container from "react-bootstrap/Container";
import {Link, Redirect} from "react-router-dom";
import axios from "axios";
import {PATH} from "./constant"

import './style.css';
import Button from "react-bootstrap/Button";

export class AnnouncementItem extends React.Component {

    state = {
        redirect: false
    }

    getDate = (timestamp) => {

        let date = new Date(timestamp)

        let monthNames = ["Jan", "Feb", "Mar", "Apr",
            "May", "Jun", "Jul", "Aug",
            "Sep", "Oct", "Nov", "Dec"];

        let hours = date.getHours();

        let minutes = date.getMinutes();

        let day = date.getDate();

        let monthIndex = date.getMonth();
        let monthName = monthNames[monthIndex];

        let year = date.getFullYear();

        return `${day}-${monthName}-${year} ${hours}:${minutes}`;
    }

    deleteAnnouncement = () => {
        axios.delete(`${PATH}announcement/${this.props.id}`)
            .then(response => {
                    alert("Successfully deleted")
                this.props.fetchData();
                }
            )
            .catch(error => alert("Oops something went wrong"))
    }

    render() {
        return (
            <>
                <Container>
                    <div className="card mb-3">
                        <div className="row no-gutters">
                            <div className="col-md-4">
                                <Link to={`/announcement/${this.props.id}`}>
                                    <img src="https://images.pushsquare.com/925ca48537125/ps5-playstation-5-1.900x.jpg"
                                         className="card-img" alt="..."/>
                                </Link>
                            </div>
                            <div className="col-md-6">
                                <div className="card-body">
                                    <Link to={`/announcement/${this.props.id}`}>
                                        <h5 className="card-title">{this.props.title}</h5>
                                    </Link>
                                    <p className="card-text">{this.props.description}</p>
                                    <p className="card-text"><small
                                        className="text-muted">{this.getDate(this.props.creationDate)}</small></p>
                                </div>
                            </div>
                            {this.props.isUserAnnouncement &&
                            <div className="col-md-2">
                                <div style={{width: "80%", margin: "auto"}}>
                                    <Button onClick={() => {this.setState({redirect: true})}} style={{margin: "5px"}} block>
                                        Edit
                                    </Button>
                                    {this.state.redirect && <Redirect to={{pathname: '/announcement/edit', id: this.props.id}} />}
                                    <Button onClick={this.deleteAnnouncement} variant="danger" style={{margin: "5px"}}
                                            block>
                                        Delete
                                    </Button>
                                </div>
                            </div>
                            }
                        </div>
                    </div>
                </Container>
            </>
        )
    }
}