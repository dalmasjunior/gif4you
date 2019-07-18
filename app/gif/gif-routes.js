const Router = require('express').Router;
const router = new Router();

const Gif = require('./gif-controller');

router.route('/save')
    .post((...args) => Gif.saveGif(...args))

router.route('/:id')
    .get((...args) => Gif.getGif(...args));

module.exports = router;