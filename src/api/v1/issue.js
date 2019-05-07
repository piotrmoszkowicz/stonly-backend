const { Router } = require("express");

const router = Router();

router.get("/issue", (req, res) => {
  res.json({
    success: true
  });
});

router.get("/issue/:id", (req, res) => {
  res.json({
    success: true
  });
});

router.post("/issue", (req, res) => {
  res.json({
    success: true
  });
});

router.put("/issue/:id", (req, res) => {
  res.json({
    success: true
  });
});

router.delete("/issue/:id", (req, res) => {
  res.json({
    success: true
  });
});

module.exports = router;
