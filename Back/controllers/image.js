const dbModels = require('../db/sequelize');
const Image = dbModels.image;
const fs = require('fs');


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
    const imageId = req.params.id;

    Image.findOne({ where: { id: imageId } })
        .then(image => {
            if (!image) {
                return res.status(404).json({ message: 'Image non trouvée' });
            }
            const filename = image.image.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Image.destroy({ where: { id: imageId } })
                    .then(() => res.status(200).json({ message: 'Image supprimée' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

//récupérer toute les images
exports.getAllImage = (req, res, next) => {
    Image.findAll({ order: [['createdAt', 'DESC']] })
        .then((things) => res.status(200).send(things))
        .catch((error) => res.status(400).send({ error: error }))
};
