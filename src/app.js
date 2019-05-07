const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("config");
const express = require("express");

const database = require("@/database");
const logger = require("@utils/logger");

const app = express();

const corsOptions = {
  origin: config.get("frontend.url"),
  optionsSuccessStatus: 200
};

app.set("x-powered-by", false);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptions));

app.use("/api", require("@api"));

app.listen(config.get("server.port"), async err => {
  if (err) {
    logger.log("error", "App error", { message: err });
    return;
  }
  await database.sync({ force: config.get("database.forceMigrate") });
  logger.log("info", `Server listening on port ${config.get("server.port")}`);
});

module.exports = {
  app
};
