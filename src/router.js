import React from "react";
import {
    BrowserRouter,
    Switch,
    Route,
}
from "react-router-dom";
import {Registration} from "./component/registration";
import {Login} from "./component/login";
import {Announcement} from "./component/announcement";
import {Head} from "./component/head";
import {CreateAnnouncement} from "./component/createAnnouncement";
import {AnnouncementList} from "./component/announcementList";
import {EditAnnouncement} from "./component/editAnnouncement";
import {ActivationUser} from "./component/activationUser";
export class Router extends React.Component{
    render() {
        return (
            <BrowserRouter>
                <Head/>
                <Switch>
                    <Route exact path="/" >
                        <AnnouncementList isUserAnnouncement={false}/>
                    </Route>
                    <Route exact path="/registration" component={Registration} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/announcement" component={CreateAnnouncement}/>
                    <Route exact path="/announcement/edit" component={EditAnnouncement}/>
                    <Route exact path="/announcement/:id" component={Announcement} />
                    <Route path="/activationUser/:activationCode" component={ActivationUser}/>
                    <Route exact path="/user/announcement">
                        <AnnouncementList isUserAnnouncement={true}/>
                    </Route>
                </Switch>
            </BrowserRouter>
        );
    }
}