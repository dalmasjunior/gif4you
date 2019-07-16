const formidable = require('formidable');

class Lib {
    randomName() {
        return Math.floor(Math.random() * Math.floor((10 ** 80) * 80)).toString().replace(/\D/g,'');
    }

    upload(file, next) {
        const form = new formidable.IncomingForm();

        form.parse(file, next);
    }
}

module.exports = new Lib();