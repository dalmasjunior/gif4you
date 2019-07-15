const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config');
const routes = require('./routes');

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}); 

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.use('/', routes);

app.listen(config.server.port, () => {
    console.log(`Server running under ${config.server.port} port...`);
});