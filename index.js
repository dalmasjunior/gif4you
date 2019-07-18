const express = require('express');
const path = require('path');

const config = require('./config');
const routes = require('./routes');

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}); 

app.use(express.static(path.join(__dirname, 'Store')));
app.use(express.static(path.join(__dirname, 'gifweb')));

app.get('/', function (req, res,next) {
    res.sendFile(path.resolve('gifweb/app/index.html'));
});
app.use('/', routes);


app.listen(config.server.port, () => {
    console.log(`Server running under ${config.server.port} port...`);
});