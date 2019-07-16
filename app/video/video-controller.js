const path          = require('path');
const formidable    = require('formidable');
const ffprobe       = require('ffprobe');
const ffprobeStatic = require('ffprobe-static');
const gify          = require('gify');

const output = path.join(__dirname, '../../Temp');

const db    = require('../db/db-controller');
const lib   = require('../lib/lib');

class VideoController {
    uploadVideo(req, res) {
        lib.upload(req, (err, fields, files) => {
            if (err) { res.status(400).json({err: err}); return;}
            ffprobe(files.video.path, {path: ffprobeStatic.path}, (err, info) => {
                if (err) {res.status(400).json({err: err.message}); return;}

                res.status(200).json({duration: info.streams[0], fileName: files.video.path});
            });
        });
    }

    convertVideo(req, res) {
        const video = req.body;

        const options = {
            start: video.start,
            end: video.end
        };

        const fileName = `${lib.randomName()}.gif`;

        gify(video.path, path.join(output, fileName), options, err => {
            db.saveGif([fileName,video.private, video.private ? video.pwd : '', new Date()]).then( result => {
                console.log(result);
                res.status(200).json(result[0]);
            });
        });
    }
}

module.exports = new VideoController();