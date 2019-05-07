const { Router } = require("express");

const router = Router();

router.use(require("./issue"));

module.exports = router;
