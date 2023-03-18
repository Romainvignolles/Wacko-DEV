const dbModels = require('../db/sequelize');
const Event = dbModels.event;
const jwt = require('jsonwebtoken');

// ajouter un event
exports.addEvent = (req, res, next) => {
    if (req.body.pseudo !== ("")) {
        const event = new Event({
            titre: req.body.titre,
            date: req.body.date,
            lieu: req.body.lieu,
            environnement: req.body.environnement,
            description: req.body.description,
            joueur: req.body.joueur,
            serveur: req.body.serveur,
            niveau: req.body.niveau,
            crimeStat: req.body.crimeStat,
            forbidenShip: req.body.forbidenShip,
            forbidenWeapon: req.body.forbidenWeapon,
            groupeur: req.body.groupeur,
            stuff: req.body.stuff,
            eventType: req.body.eventType,
            image: req.body.image,
        });
        event.save()
            .then(() => res.status(201).json({ message: 'nouvel event ajouter!' }))
            .catch(error => { res.status(400).json({ error }) });
    } else {
        res.status(500).json({ message: 'Champs invalide' })
    }
};

// recupérer tout les event
exports.getAllEvent = (req, res, next) => {
    Event.findAll({ include: { all: true, nested: true }, order: [['createdAt', 'DESC']]})
        .then((things) => res.status(200).send(things))
        .catch((error) => res.status(400).send({ error: error }))
};

//recupère un seul event
exports.getOneEvent = (req, res, next) => {
    Event.findOne({ include: { all: true, nested: true }, where: { id: req.params.id } })
        .then((starships) => res.status(200).send(starships))
        .catch((error) => res.status(400).send({ error: error }))
};
