const axios = require('axios');
const crypto = require('crypto');
const fs = require('fs');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });
require('dotenv').config();
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

const getNewCodeVerifier = () => {
    return crypto.randomBytes(64).toString('hex');
}

const printNewAuthorisationUrl = (code_challenge) => {
    const url = `https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}&code_challenge=${code_challenge}`;
    console.log(`Authorise your application by clicking below.\n${url}`);
    return;
}

const generateNewToken = (authorisationCode, codeVerifier, callback) => {
    const url = 'https://myanimelist.net/v1/oauth2/token';
    const data = {
        'client_id' : CLIENT_ID,
        'client_secret': CLIENT_SECRET,
        'code' : authorisationCode,
        'code_verifier' : codeVerifier,
        'grant_type' : 'authorization_code'
    }
    let params = new URLSearchParams(data).toString()
    axios.post(url, params, {
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded', 
            },
        }).then(response => {
            const token = response.data;
            console.log(`token generated successfully.`);
            console.log(`token from function.\n${JSON.stringify(token)}`)
            callback(token)
        })
}

const saveToken = (token) => {
    fs.writeFile('token.json', JSON.stringify(token, null, 4), (err) => {
        if (err) {  console.error(err);  return; };
        console.log("file has been created");
    });
}

const printUserInfo = (accessToken) => {
    const url = 'https://api.myanimelist.net/v2/users/@me';

    axios.get(url, {}, {
        headers : {
            'Authorization' : `Bearer ${accessToken}`
        }
    }).then(response => {
        console.log(`\n>>> Greetings ${response.data['name']}! <<<`)
    })
}

module.exports = (callback) => {
    codeVerifier = getNewCodeVerifier();
    codeChallenge = codeVerifier;
    printNewAuthorisationUrl(codeChallenge);
    readline.question(`Paste your code below.\n`, code => {
        readline.close();
        generateNewToken(code, codeVerifier, (token) => {
            saveToken(token)
            callback('authenticated');
        })
      });
}
