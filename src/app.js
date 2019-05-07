const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("config");
const express = require("express");

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

app.listen(config.get("server.port"), () => {
  logger.info(`Server listening on port ${config.get("server.port")}`);
});

module.exports = {
  app
};
