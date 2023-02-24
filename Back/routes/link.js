const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');


const linkCtrl = require('../controllers/link.js');

//ajouter un lien utile
router.post('/addLink',auth, linkCtrl.addLink);

//supprime un lien utile
router.delete('/deleteLink/:id',auth, linkCtrl.deleteLink);

//retourne tout les liens utiles
router.get('/getAllLink',auth, linkCtrl.getAllLink);


module.exports = router;