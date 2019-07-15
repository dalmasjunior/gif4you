const Router = require('express').Router;
const router = new Router();

const Video = require('./app/video/video-routes');

router.use('/video', Video);

module.exports = router;