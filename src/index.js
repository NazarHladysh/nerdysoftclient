import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from "axios"
import {Router} from "./router";
import {PATH} from "./component/constant";

axios.interceptors.request.use(config => {
    // Do something before request is sent
    if(localStorage.getItem("JWT") !== null) {
        config.headers.Authorization = localStorage.getItem("JWT");
    }
    return config;
}, error => {
    // Do something with request error
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {

    return response;
}, error => {
    if(error.response.status === 403) {
        localStorage.removeItem("JWT")
        // window.location.replace(PATH)
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});
ReactDOM.render(
    <Router/>,
    document.getElementById('root')
);

