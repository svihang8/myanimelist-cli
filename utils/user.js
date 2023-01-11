const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = (token) => {
    const url = 'https://api.myanimelist.net/v2/users/@me?fields=anime_statistics';
        console.log(`access-token : ${token['access_token']}`);
        axios.create({
            headers: {
                Authorization : `Bearer ${token['access_token']}`
                }
        }).get(url).then(response => {
            console.log(`user information\n${JSON.stringify(response.data)}`);
        });
}