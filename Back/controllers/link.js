const dbModels = require('../db/sequelize');
const Link = dbModels.link;

exports.addLink = (req, res, next) => {
    if (req.body.title !== ("") && req.body.type !== ("") && req.body.link !== ("")) {

        const link = new Link({
            title: req.body.title,
            type: req.body.type,
            link: req.body.link,
        });
        link.save()
            .then(() => res.status(201).json({ message: 'Lien Utile ajouté!' }))
            .catch(error => { res.status(400).json({ error }) });
    } else {
        res.status(500).json({ message: 'Champs invalide' })
    }

};

exports.modifyLink = (req, res, next) => {
    Link.findOne({ where: { id: req.params.id } })
        .then(link => {

            console.log("okkkkk");
            const thingObject =
            {
                title: req.body.title,
                type: req.body.type,
                link: req.body.link,
            };
            link.update({ ...thingObject }, { where: { id: req.params.id } })
                .then(() => res.status(200).json({ thingObject }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));

};

exports.deleteLink = (req, res, next) => {
    Link.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'lien utile supprimé' }))
        .catch(error => res.status(400).json({ error }));
};

exports.getAllLink = (req, res, next) => {
    Link.findAll({order:[ ['title', 'ASC']]})
        .then((things) => res.status(200).send(things))
        .catch((error) => res.status(400).send({ error: error }))
};