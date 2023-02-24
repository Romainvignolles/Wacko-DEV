const dbModels = require('../db/sequelize');
const Starships = dbModels.starships;

exports.addStarship = (req, res, next) => {
    if (req.body.name !== ("") && req.body.image !== ("") && req.body.link !== ("")) {
        const ship = new Starships({
            name: req.body.name,
            image: req.body.image,
            link: req.body.link,
        });
        ship.save()
            .then(() => res.status(201).json({ message: 'vaisseau ajouté!' }))
            .catch(error => { res.status(400).json({ error }) });
    } else {
        res.status(500).json({ message: 'Champs invalide' })
    }
};

exports.getAllShips = (req, res, next) => {
    Starships.findAll({ include: { all: true, nested: true }, order: [['name', 'ASC']] })
        .then((things) => res.status(200).send(things))
        .catch((error) => res.status(400).send({ error: error }))
};

exports.getOneShips = (req, res, next) => {
    Starships.findOne({ include: { all: true, nested: true }, where: { id: req.params.id } })
        .then((starships) => res.status(200).send(starships))
        .catch((error) => res.status(400).send({ error: error }))
};

exports.deleteship = (req, res, next) => {
    Starships.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'vaisseau supprimé' }))
        .catch(error => res.status(400).json({ error }));
};




