const winston = require("winston");

const { format } = winston;

const transports = [
  new winston.transports.Console({
    level: process.env.NODE_ENV === "production" ? "error" : "debug"
  })
];

const logger = winston.createLogger({
  transports,
  format: format.combine(format.timestamp(), format.prettyPrint())
});

module.exports = logger;
