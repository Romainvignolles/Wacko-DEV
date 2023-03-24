module.exports = (sequelize, Sequelize) => {
    const image = sequelize.define("image", {
      image: {
        type: Sequelize.STRING,
        unique: true
      },
    });

    return image;
  };