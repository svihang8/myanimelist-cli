const server = require('./server');
const auth = require('./auth');

module.exports = () => {
    server((message) => {
        console.log(`${message} successfully`);
        auth((message) => {
            console.log(`${message} successfully`);
            return;
        })
    })
}