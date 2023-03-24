const dbModels = require('../db/sequelize');
const Image = dbModels.image;

// ajouter une image
exports.addImage = (req, res, next) => {
    if (req.file) {
        let url = null
        url = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

        let newImage = new Image({
            image: url,
        });

        newImage.save()
            .then(() => res.status(201).json({ message: 'Image ajouté!' }))
            .catch(error => { res.status(400).json({ error }) });
    } else {
        res.status(500).json({ message: 'Champs invalide' })
    }

};

//supprimer une image
exports.deleteImage = (req, res, next) => {
    Image.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'image supprimé' }))
        .catch(error => res.status(400).json({ error }));
};

//récupérer toute les images
exports.getAllImage = (req, res, next) => {
    Image.findAll({ order: [['createdAt', 'DESC']] })
        .then((things) => res.status(200).send(things))
        .catch((error) => res.status(400).send({ error: error }))
};
