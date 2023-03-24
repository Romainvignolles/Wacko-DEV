const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer =  require('../middleware/multer')


const imageCtrl = require('../controllers/image.js');

//ajoute une image
router.post('/addImage',multer, imageCtrl.addImage)

//recupère les images
router.get('/getImage', imageCtrl.getAllImage)

//supprime une image
router.delete('/deleteImage/:id', imageCtrl.deleteImage);



module.exports = router;
