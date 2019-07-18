const path = require('path');

const db    = require('../db/db-controller');
const lib   = require('../lib/lib');

class GifController {
    
    saveGif(req, res) {
        try {            
            lib.upload(req, (err, fields, files) => {
                if (err) { res.status(400).json({err: err}); return;}
                lib.saveFile(fields.file, (fileName) => {
                    db.saveGif([fileName,fields.private == "true", fields.private == "true" ? fields.password : '', fields.validaty]).then( result => {
                        console.log(result);
                        res.status(200).json(result[0]);
                    });
                })
            });
        } catch (error) {
            res.status(400).json({err: error});
        }
    }

    getGif(req, res) {
        db.getGif(req.params.id).then( (result, test) => {
            res.status(200).json({gif: result[0][0]})
        })
    }
}

module.exports = new GifController();