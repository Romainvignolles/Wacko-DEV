const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');


const userCtrl = require('../controllers/user.js');

//retourne tout les membres de la WACKO
router.get('/user',auth, userCtrl.getAllUser);

//retourne le membre connecté
router.get('/user/:id',auth, userCtrl.getOneUser);

//modification des droits admin 
router.put('/admin/:id',auth,userCtrl.modifyMemberRight);




//obsolète

//supprimer un membre de la BDD
router.delete('/deleteUser/:id',userCtrl.deleteUser)

//ajouter un membre a la BDD
router.post('/addUser', userCtrl.addUser);


module.exports = router;
