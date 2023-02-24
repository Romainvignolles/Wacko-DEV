module.exports = (sequelize, Sequelize) => {
    const starships = sequelize.define("vaisseau", {
      name: {
        type: Sequelize.STRING,
        unique: true
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      link: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });

    return starships;
  };