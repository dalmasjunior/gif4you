const mysql = require('mysql2');
const bluebird = require('bluebird');

const config = require('../../config');

var db = mysql.createConnection({
    host            : config.db.url,
    user            : config.db.username,
    password        : config.db.pwd,
    database        : config.db.alias,
    Promise         : bluebird
});

module.exports = db;