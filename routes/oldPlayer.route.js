var express = require('express');
var router = express.Router();
const controller = require('../controllers/oldPlayer.controller');


router.route('/')
.post(controller.post)
.get(controller.get)



module.exports = router