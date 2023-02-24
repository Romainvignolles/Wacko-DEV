const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');


const hangarPersoCtrl = require('../controllers/hangar.js');

//ajouter un propriétaire de vaisseaux
router.post('/addHangar',auth, hangarPersoCtrl.hangarPerso);

//supprime un vaisseau
router.get('/deleteHangar/:shipId/:userId',auth, hangarPersoCtrl.deleteHangar);


module.exports = router;