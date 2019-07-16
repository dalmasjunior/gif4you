const Router = require('express').Router;
const router = new Router();

const Gif = require('./app/gif/gif-routes');
const Video = require('./app/video/video-routes');

router.use('/gif', gif);
router.use('/video', Video);

module.exports = router;