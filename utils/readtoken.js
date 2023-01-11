const fs = require('fs');
const path = require('path');
module.exports = (callback) => {
    fs.readFile(path.resolve(__dirname, '..', 'token.json'),{} , (err, data) => {
        const token = JSON.parse(data);
        console.log(`access-token : ${token['access_token']}`)
        callback(token);
    });
}