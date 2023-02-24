module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define("utilisateur", {
    pseudo: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    gestion: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    date: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    discriminator: {
      type: Sequelize.STRING,
      allowNull: true,
    }
  });

  return user;
};