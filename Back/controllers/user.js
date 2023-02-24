const dbModels = require('../db/sequelize');
const User = dbModels.user;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.getAllUser = (req, res, next) => {
    User.findAll({ include: { all: true, nested: true }, order: [['pseudo', 'ASC']] })
        .then((things) => res.status(200).send(things))
        .catch((error) => res.status(400).send({ error: error }))
};

exports.getOneUser = (req, res, next) => {
    User.findOne({ where: { discriminator: req.params.id }, include: { all: true, nested: true } })
        .then((member) => res.status(200).send(member))
        .catch((error) => res.status(400).send({ error: error }))
};

exports.modifyMemberRight = (req, res, next) => {
    User.findOne({ where: { discriminator: req.params.id } })
        .then(member => {

            let gestions = req.body.gestion

            member.update({ gestion: gestions }, { where: { discriminator: req.params.id } })
                .then(() => res.status(200).json({ gestions }))
                .catch(error => res.status(400).json({ error }));

        })
        .catch(error => res.status(500).json({ error }));

};

exports.deleteUser = (req, res, next) => {
    User.destroy({ where: { discriminator: req.params.id } })
        .then(() => res.status(200).json({ message: 'Compte supprimé' }))
        .catch(error => res.status(400).json({ error }));
};

//obsolète
exports.addUser = (req, res, next) => {
    if (req.body.pseudo !== ("")) {
        const user = new User({
            pseudo: req.body.pseudo,
            role: req.body.role,
            gestion: req.body.gestion,
            image: req.body.image,
        });
        user.save()
            .then(() => res.status(201).json({ message: 'membre WACKO ajouté!' }))
            .catch(error => { res.status(400).json({ error }) });
    } else {
        res.status(500).json({ message: 'Champs invalide' })
    }
};


