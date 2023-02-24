module.exports = (sequelize, Sequelize) => {
    const link = sequelize.define("lienUtile", {
      title: {
        type: Sequelize.STRING,
        unique: true
      },
      link: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });

    return link;
  };