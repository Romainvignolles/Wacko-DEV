const dbModels = require('../db/sequelize');
const Hangar = dbModels.hangar;

exports.hangarPerso = (req, res, next) => {
    const user = new Hangar({
        utilisateurId: req.body.utilisateurId,
        vaisseauId: req.body.vaisseauId,
    });

    user.save()
        .then(() => res.status(201).json({ message: 'nouveau vaisseau ajouté!' }))
        .catch(error => { res.status(400).json({ error }) });

};

exports.deleteHangar = (req, res, next) => {
    Hangar.findOne({ where: { vaisseauId: req.params.shipId, utilisateurId: req.params.userId } })
        .then(hangar => {
            hangar.destroy({ where: { vaisseauId: req.params.shipId, utilisateurId: req.params.userId } })
                .then(() => res.status(200).json({ message: 'vaisseau supprimé' }))
                .catch(error => res.status(400).json({ error }));
        })
};
