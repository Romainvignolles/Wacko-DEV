const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');


const eventCtrl = require('../controllers/event.js');

//ajoute un event
router.post('/addEvent', eventCtrl.addEvent)



module.exports = router;
