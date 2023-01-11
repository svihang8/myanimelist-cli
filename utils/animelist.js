const axios = require("axios");



const getAnimeList = (token) => {
    const url = 'https://api.myanimelist.net/v2/users/@me/animelist';
    axios.create({
        headers: {
            Authorization : `Bearer ${token['access_token']}`
            }
    }).get(url).then(response => {
        console.log(`user information\n${JSON.stringify(response.data)}`);
    })
}

const deleteAnimeList = (token, name) => {
    let url = `https://api.myanimelist.net/v2/anime?q=${name}&limit=1'`

    axios.create({
        headers: {
            Authorization : `Bearer ${token['access_token']}`
            }
    }).get(url).then(response => {
        console.log(`list of anime\n${JSON.stringify(response.data)}`);
        const animeId = response.data.data[0].node['id'];
        url = `https://api.myanimelist.net/v2/anime/${animeId}/my_list_status`
        axios.create({
            headers: {
                Authorization : `Bearer ${token['access_token']}`
            }
        }).delete(url).then(response => {
            console.log(response);
            console.log('deletion request complete');
        })
    });
}

const updateAnimeList = (token, name, data) => {
    let url = `https://api.myanimelist.net/v2/anime?q=${name}&limit=1'`;
    axios.create({
        headers: {
            Authorization : `Bearer ${token['access_token']}`
            }
    }).get(url).then(response => {
        console.log(`list of anime\n${JSON.stringify(response.data)}`);
        const animeId = response.data.data[0].node['id'];
        let params = {}
        for(const key in data) {
            if(data[key] != '-1') {
                params[key] = data[key]
            }
        }
        url = `https://api.myanimelist.net/v2/anime/${animeId}/my_list_status`
        axios.create({
            headers: {
                Authorization : `Bearer ${token['access_token']}`
            }
        }).patch(url, new URLSearchParams(params).toString()).then(response => {
            console.log(response);
            console.log('update request complete');
        })
    });
}



module.exports = (command, token) => {
    switch(command[3]) {
        case 'get':
            getAnimeList(token);
            break;
        case 'delete':
            deleteAnimeList(token, commans[4]);
            break;
        case 'update':
            updateAnimeList(token, command[4], {
                'status' : command[5],
                'score' : command[6],
                'episodes' : command[7]
            });
            break;
        default:
            console.log('no option provided')
            break;
    }
}