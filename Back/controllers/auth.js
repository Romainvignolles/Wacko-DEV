const dbModels = require('../db/sequelize');
const User = dbModels.user;
const jwt = require('jsonwebtoken');


exports.discord = (req, res, next) => {

    // Traitement des Roles discord
    const invitéStatut = "985975287395254363"
    const wackoRoleArray = [{ "name": "Invités", "id": "985975287395254363", "priority": "0" }, { "name": "Recrue", "id": "985975667114016798", "priority": "1" }, { "name": "Membre", "id": "985974627929038948", "priority": "2" }, { "name": "GIGM", "id": "988577152393949254", "priority": "3" }]
    const discordRole = req.body.role

    var compareArray = wackoRoleArray.filter(function (obj) {
        return discordRole.some(function (obj2) {
            return obj.id === obj2;
        });
    });

    let highestPriorityRole = compareArray[0];
    for (let i = 1; i < compareArray.length; i++) {
        const currentRole = compareArray[i];
        if (parseInt(currentRole.priority) > parseInt(highestPriorityRole.priority)) {
            highestPriorityRole = currentRole;
        }
    }

    userRole = highestPriorityRole.name

    // données reçu du front

    let discordPseudo = req.body.pseudo;
    let discriminator = req.body.discriminator;
    let date = req.body.date;
    let avatarUrl = req.body.avatarUrl;

    if (discordRole.includes(invitéStatut)) {  // si l'utilisateur a le statut invité sur le discord WACKO il est recalé

        return res.status(400).send({ message: "vous ne faites pas partie de la Wacko" })

    } else { // si il a un statut autre que invité

        User.findOne({ where: { discriminator: req.body.discriminator }, include: { all: true, nested: true } })  // on regarde si il existe deja dans la base de donnée
            .then((member) => {

                if (member) {                      // si il existe deja on lui donne un token 

                    if (member.pseudo != discordPseudo || member.role != userRole || member.image != avatarUrl) { // si son pseudo ou son roles sont différents on MAJ la BDD

                        member.update({ pseudo: discordPseudo, role: userRole, image: avatarUrl }, { where: { discriminator: req.params.discriminator } })
                            .then(() => {
                                res.status(200).json({
                                    discriminator: discriminator,
                                    token: jwt.sign(
                                        { discriminator: discriminator },
                                        '[f9p0)|_^,f[7#B^9cSn~ps5*]9yF2',
                                        { expiresIn: '24h' }
                                    )
                                });
                            })

                            .catch(error => res.status(400).json({ error }));

                    } else {                    // si ses informations sont les meme qu'en BDD il prend sont token et il accède au site
                        res.status(200).json({
                            discriminator: discriminator,
                            token: jwt.sign(
                                { discriminator: discriminator },
                                '[f9p0)|_^,f[7#B^9cSn~ps5*]9yF2',
                                { expiresIn: '24h' }
                            )
                        });
                    }


                } else {                            // si il existe pas en BDD on le rajoute
                    const user = new User({
                        pseudo: discordPseudo,
                        role: userRole,
                        gestion: req.body.gestion,
                        image: avatarUrl,
                        discriminator: discriminator,
                        date: date
                    });

                    user.save()                     // l'utilisateur est save dans la base de donée et on lui attribut un token
                        .then(() => {
                            res.status(200).json({
                                discriminator: discriminator,
                                token: jwt.sign(
                                    { discriminator: discriminator },
                                    '[f9p0)|_^,f[7#B^9cSn~ps5*]9yF2',
                                    { expiresIn: '24h' }
                                )
                            });
                        })
                        .catch(error => { res.status(400).json({ error }) });

                }

            })
            .catch((error) => res.status(400).send({ error: error }))
    }
};