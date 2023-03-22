const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');


const eventCtrl = require('../controllers/event.js');

//ajoute un event
router.post('/addEvent', eventCtrl.addEvent)

//recupérer tout les events
router.get('/getAllEvent', eventCtrl.getAllEvent)

//recupérer un seul events
router.get('/getOneEvent/:id', eventCtrl.getOneEvent)

//modifier un event
router.put('/modifyEvent/:id/:userId', eventCtrl.modifyEvent)

//supprimer un event
router.delete('/deleteEvent/:id', eventCtrl.deleteEvent)



module.exports = router;
