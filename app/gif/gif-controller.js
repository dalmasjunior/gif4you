const path = require('path');

const db    = require('../db/db-controller');
const lib   = require('../lib/lib');

class GifController {
    upload(req, res) {
        lib.upload(req, (err, fields, files) => {
            if (err) { res.status(400).json({err: err}); return;}

            res.status(200).json({fileName: files.video.path});
        });
    }

    saveGif(req, res) {
        const gif = req.body;
        try {            
            db.saveGif([fileName,video.private, video.private ? video.pwd : '', new Date()]).then( (result, test) => {
                console.log(test);
                console.log(result);
                res.status(200).json(result[0]);
            });
        } catch (error) {
            res.status(400).json({err: error});
        }
    }

    getGif(req, res) {
        db.getGif(req.params.id).then( (result, test) => {
            console.log(test);
                console.log(result);
            res.status(200).json(result[0]);
        })
    }
}

module.exports = new GifController();