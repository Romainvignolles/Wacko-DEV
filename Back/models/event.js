module.exports = (sequelize, Sequelize) => {
    const event = sequelize.define("event", {
        titre: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        date: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        lieu: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        environnement: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        joueur: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        serveur: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        niveau: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        crimeStat: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        forbidenShip: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        forbidenWeapon: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        groupeur: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        stuff: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        eventType: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        image: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        topColor: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        titleColor: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        textColor: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        paraColor: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });

    return event;
};