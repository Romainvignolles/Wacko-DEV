const express = require('express');
const router = express.Router();

const discordCtrl = require('../controllers/auth.js');



router.post("/discordAuth", discordCtrl.discord);


module.exports = router;