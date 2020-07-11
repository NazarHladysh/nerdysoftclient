import React from "react";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import {SimilarAnnouncementList} from "./similarAnnouncementList";
import {PATH} from "./constant"

export class Announcement extends React.Component {

    state = {
        announcement: {},
        errorMessage: undefined
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        axios.get(`${PATH}announcement/${this.props.match.params.id}`)
            .then(response => this.setState({announcement: response.data}))
            .catch(err => {
                this.setState({errorMessage: err.response.data.message})
            })
    }

    componentDidUpdate(prevProps) {
        if(this.props.match.params.id !== prevProps.match.params.id)
        {
            this.fetchData();
        }
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

    render() {
        return (
            <>
                <Container>
                    {this.state.errorMessage === undefined &&
                    <>
                        <h1>{this.state.announcement.title}</h1>
                        <hr/>
                        <Carousel style={{width: "70%", margin: "auto"}}>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="https://images.pushsquare.com/925ca48537125/ps5-playstation-5-1.900x.jpg"
                                    alt="First slide"
                                />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="https://images.pushsquare.com/925ca48537125/ps5-playstation-5-1.900x.jpg"
                                    alt="Third slide"
                                />
                            </Carousel.Item>
                        </Carousel>
                        <hr/>
                        <p>Creation date: {this.getDate(this.state.announcement.creationDate)}</p>
                        <hr/>
                        <h3>Description:</h3>
                        <p>{this.state.announcement.description}</p>
                        <hr/>
                        <h2>Similar Announcement</h2>
                        <SimilarAnnouncementList id={this.props.match.params.id}/>
                    </>
                    }
                    {this.state.errorMessage && <h1 style={{textAlign: 'center'}}>{this.state.errorMessage}</h1>}
                </Container>
            </>
        );
    }
}