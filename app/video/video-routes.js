const Router = require('express').Router;
const router = new Router();

const Video = require('./video-controller');

router.route('/upload')
    .post((...args) => Video.uploadVideo(...args));

router.route('/convert')
    .post((...args) => Video.convertVideo(...args));

module.exports = router;