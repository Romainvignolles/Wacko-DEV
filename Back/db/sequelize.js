const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user")(sequelize, Sequelize);
db.starships = require("../models/starships")(sequelize, Sequelize);
db.link = require("../models/link")(sequelize, Sequelize);
db.hangar = require("../models/hangar")(sequelize, Sequelize);
db.event = require("../models/event")(sequelize, Sequelize);
db.image = require("../models/image")(sequelize, Sequelize);


db.user.belongsToMany(db.starships, { through: db.hangar });
db.starships.belongsToMany(db.user, { through: db.hangar });


module.exports = db;
