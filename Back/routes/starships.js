const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');


const starshipsCtrl = require('../controllers/starships.js');

//ajoute un vaisseau
router.post('/addStarship',auth, starshipsCtrl.addStarship)

//retourne tout les vaisseaux
router.get('/starships',auth, starshipsCtrl.getAllShips);

//retourne le vaisseau selectionné
router.get('/starships/:id',auth, starshipsCtrl.getOneShips);

//supprime le vaisseau selectionné
router.delete('/starships/:id',auth, starshipsCtrl.deleteship);

//modifie le vaisseau selectionné
router.put('/modifyStarships/:id',starshipsCtrl.modifyShip);

module.exports = router;
