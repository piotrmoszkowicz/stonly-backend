const config = require("config");
const fs = require("fs");
const Sequelize = require("sequelize");
const path = require("path");

const logger = require("@utils/logger");

const dbConfig = config.get("database");

const database = new Sequelize(
  dbConfig.name,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.engine,
    logging: (msg) => logger.info(msg),

    pool: {
      max: dbConfig.maxConnections,
      min: dbConfig.minConnections,
      idle: dbConfig.maxIdleTime
    },

    timezone: "+02:00"
  }
);

const modelsPath = __dirname + "/models/";

fs
  .readdirSync(modelsPath)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = database.import(path.join(modelsPath, file));
    database[model.name] = model;
  });

module.exports = database;
