const formidable = require('formidable');
const fs = require('fs');
const ffprobe = require('ffprobe');
const ffprobeStatic = require('ffprobe-static');
const path = require('path');

const gifify = require('gifify');
const gify = require('gify');

const output = path.join(__dirname, '../../Temp');

const bitlyClient = require('bitly').BitlyClient;
const bitly = new bitlyClient('311fb8a24ffe0fe6490893f77d20afe94ded7693', {});

async function urlShortner(url) {
    return await bitly.shorten(url);
}

class VideoController {
    uploadVideo(req, res) {
        const form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {
            
            if (err) { res.status(400).json({err: err}); return;}
            ffprobe(files.video.path, {path: ffprobeStatic.path}, (err, info) => {
                if (err) {res.status(400).json({err: err.message}); return;}

                res.status(200).json({duration: info.streams[0], fileName: files.video.path});
            })        
        })
    }

    convertVideo(req, res) {
        const start = req.body.start;
        const end = req.body.end;
        const fileName = req.body.fileName;

        

        const options = {
            start: start,
            end: end
        };

        gify(fileName, path.join(output, 'teste.gif'), options, err => {
            if (err) res.end(400);

            urlShortner('http://localhost:9001/'+fileName).then(shortUrl => {
                res.status(200).json({url: shortUrl});
            })
            
        })

        

        


    }
}

module.exports = new VideoController();