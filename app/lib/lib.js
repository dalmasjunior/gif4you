const formidable = require('formidable');
const fs = require('fs');

class Lib {
    randomName() {
        return Math.floor(Math.random() * Math.floor((10 ** 80) * 80)).toString().replace(/\D/g,'');
    }

    upload(file, next) {
        const form = new formidable.IncomingForm();

        form.parse(file, next);
    }

    saveFile(file, next) {
      const fileName = `${this.randomName()}.gif`;
      fs.writeFile(`./Store/${fileName}`, file, 'base64', (err) => {
        console.log(err);
      });
      next(fileName);
    }
}

module.exports = new Lib();