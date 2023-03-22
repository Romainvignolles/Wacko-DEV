const dbModels = require('../db/sequelize');
const Event = dbModels.event;
const User = dbModels.user;
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
    Event.findAll({ include: { all: true, nested: true }, order: [['createdAt', 'DESC']] })
        .then((things) => res.status(200).send(things))
        .catch((error) => res.status(400).send({ error: error }))
};

//recupère un seul event
exports.getOneEvent = (req, res, next) => {
    Event.findOne({ include: { all: true, nested: true }, where: { id: req.params.id } })
        .then((starships) => res.status(200).send(starships))
        .catch((error) => res.status(400).send({ error: error }))
};

//modifier un event
exports.modifyEvent = (req, res, next) => {
    User.findOne({ where: { discriminator: req.params.userId } })
        .then(function (user) {
            Event.findOne({ where: { id: req.params.id } })
                .then((event) => {
                    if (user.gestion === true) {
                        const thingObject = req.file ?
                            {
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
                            } : { ...req.body };

                        Event.update({ ...thingObject }, { where: { id: req.params.id } })
                            .then(() => res.status(200).json({ message: 'event modifié !' }))
                            .catch(error => res.status(400).json({ error }));
                    } else {
                        res.status(403).json({
                            message: "Vous n'avez pas les droits de modification d'event"
                        });
                    }

                })
                .catch(error => res.status(500).json({ error }));


        })
        .catch(error => res.status(400).json({ error }));
};

//supprimer un event
exports.deleteEvent = (req, res, next) => {
    Event.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'event supprimé' }))
        .catch(error => res.status(400).json({ error }));
};


