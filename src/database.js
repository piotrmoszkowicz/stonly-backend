const config = require("config");
const Sequelize = require("sequelize");

const dbConfig = config.get("database");

const database = new Sequelize(
  dbConfig.name,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.engine,
    logging: false,

    pool: {
      max: dbConfig.maxConnections,
      min: dbConfig.minConnections,
      idle: dbConfig.maxIdleTime
    },

    timezone: "+02:00"
  }
);

module.exports = database;
