const { Router } = require("express");

const issueService = require("@services/issue");
const logger = require("@utils/logger");

const router = Router();

router.get("/issue", async (req, res) => {
  try {
    const issues = await issueService.getIssues();
    return res.json({
      data: issues
    });
  } catch (error) {
    logger.log("error", "Error while getting issues for /issue endpoint", {
      error
    });
    return res.status(400).json({
      error:
        "Error with out database. We will try to get back as fast as we can!"
    });
  }
});

router.get("/issue/:id", async (req, res) => {
  try {
    const issue = await issueService.getIssue(req.params.id);
    if (issue === null) {
      return res.status(404).json({
        data: null
      });
    }
    return res.json({
      data: issue
    });
  } catch (error) {
    logger.log(
      "error",
      `Error while getting issue for /issue/${req.params.id} endpoint`,
      { error }
    );
    return res.status(400).json({
      error: "Error while getting issue, please provide correct issue ID."
    });
  }
});

router.post("/issue", async (req, res) => {
  try {
    const issueObject = req.body;
    const issue = await issueService.createIssue(issueObject);
    return res.json({
      data: issue
    });
  } catch (error) {
    logger.log(
      "error",
      "Error while creating issue",
      { error }
    );
    return res.status(400).json({
      error: "Error while creating issue, please specify correct data.",
      reason: error.errors.reduce((acc, err) => acc + err.message + ". ", "")
    });
  }
});

router.put("/issue/:id", async (req, res) => {
  try {
    const issueObject = req.body;
    const issue = await issueService.updateIssue(req.params.id, issueObject);
    return res.json({
      data: issue
    });
  } catch (error) {
    logger.log(
      "error",
      `Error while updating issue for endpoint /issue/${req.params.id}`,
      { error }
    );
    return res.status(400).json({
      error: "Error while updating issue, please specify correct data.",
      reason: error.errors.reduce((acc, err) => acc + err.message + ". ", "")
    });
  }
});

router.delete("/issue/:id", async (req, res) => {
  try {
    const result = await issueService.deleteIssue(req.params.id);
    return res.json({
      result
    });
  } catch (error) {
    logger.log("error", `Error while deleting issue ${req.params.id}`, {
      error
    });
    return res.status(400).json({
      error: "Error while deleting issue, please provide correct issue ID."
    });
  }
});

module.exports = router;
