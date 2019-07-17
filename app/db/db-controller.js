const mysql = require('mysql2');
const db = require('./db-model');

function execQuery(query, params) {
    let queryAux = mysql.format(query, params);

    return db.promise().query(queryAux);
}

class DbController {
    getGif(id) {
        let selectQuery = 'SELECT * FROM gif WHERE ?? = ?';
    
        return execQuery(selectQuery, ['id', id]);
    }

    saveGif(values) {
        let insertQuery = 'INSERT INTO gif (filename, private, password, validity) VALUES (?,?,?,?)';
        
        return execQuery(insertQuery, values);        
    }

    deleteGif(id) {
        let deleteQuery = 'DELETE FROM gif WHERE';

        return execQuery(deleteQuery, ['id', id]);
    }
}

module.exports = new DbController();