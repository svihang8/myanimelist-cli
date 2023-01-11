const express = require('express');
const app = express();

module.exports = (callback) => {
    try {
        app.use(express.json())
        app.get('/', (req, res) => {
            res.json({
                'message' : 'worked',
                'code' : req.query.code,
            })
        })
        app.listen(3001, () => {
            console.log('server running on 3001');
            callback('server is created.')
        })
    } catch (error) {
        console.error(error);
    }
}