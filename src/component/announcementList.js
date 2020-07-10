import React from "react";
import CardDeck from 'react-bootstrap/CardDeck';
import {AnnouncementItem} from "./announcementItem";
import axios from "axios"
import {PATH} from "./constant"

export class AnnouncementList extends React.Component {

    state = {
        announcement: []
    }

    fetchData = () => {
        axios.get(this.getUrl())
            .then(response => this.setState({announcement: response.data}))
    }

    getUrl = () => {
        return this.props.isUserAnnouncement ? `${PATH}user` : `${PATH}announcement/findAll`
    }

    componentDidUpdate(prevProps) {
        if(this.props.isUserAnnouncement !== prevProps.isUserAnnouncement)
        {
            this.fetchData();
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    render() {
        return (
            <>
                <CardDeck className="d-flex justify-content-around">
                    {this.state.announcement.map(element => (
                        <AnnouncementItem
                            key={element.id}
                            id={element.id}
                            title={element.title}
                            description={element.description}
                            creationDate={element.creationDate}
                            userId={element.userId}
                            isUserAnnouncement={this.props.isUserAnnouncement}
                            fetchData={this.fetchData}
                        />
                    ))}
                </CardDeck>
            </>
        )
    }
}