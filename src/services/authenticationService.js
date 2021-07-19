import React from 'react';
import axios from 'axios';

const getAccessToken = () => {
    return localStorage.getItem("access_token");
}

export const userLogin = (authenticationRequest) => {
    return axios({
        'method': 'POST',
        'url': 'http://localhost:9191/oauth/token',
        'data': authenticationRequest
    });
}

export const fetchUserData = (authenticationRequest) => {
    return axios({
        'method': 'GET',
        'url': 'http://localhost:9191/api/v1/users',
        'headers': {
            'Authorization': `Bearer ${getAccessToken()}`
        }
    });
}