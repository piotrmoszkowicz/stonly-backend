const _ = require("lodash");

const { Issue } = require("@/database");

const ISSUE_CREATE_ALLOWED_PROPERTIES = ["title", "description"];
const ISSUE_UPDATE_ALLOWED_PROPERTIES = ["title", "description", "state"];

const issueService = {
  /**
   * Creates new issue
   * @param {Object}    issueObject     -   Data of new issue
   * @returns {Promise<Object>}         -   New issue instance
   */
  createIssue: async issueObject => {
    const filteredCreationData = issueService._pickAllowedCreationProperties(
      issueObject
    );
    const newIssue = Issue.build({
      title: filteredCreationData.title,
      description: filteredCreationData.description
    });
    await newIssue.save();
    return newIssue;
  },

  /**
   * Delete issue by ID
   * @param {Number}    id              -   ID of issue
   * @returns {Promise<boolean>}        -   Result of deletion
   */
  deleteIssue: async id => {
    try {
      const issue = await issueService.getIssue(id);
      await issue.destroy();
      return true;
    } catch (err) {
      throw err;
    }
  },

  /**
   * Returns issue by id
   * @param {Number}    id              -   ID of issue
   * @returns {Promise<Object>}
   */
  getIssue: id => {
    return Issue.findOne({
      where: {
        id
      }
    });
  },

  /**
   * Returns all issues
   * @returns {Promise<Object[]>}
   */
  getIssues: () => {
    return Issue.findAll();
  },

  /**
   * Updates issue by ID
   * @param {Number}    id                -   ID of issue to update
   * @param {Object}    issueUpdates      -   Object with issue updates
   * @returns {Promise<Object>}           -   Updates issue
   */
  updateIssue: async (id, issueUpdates) => {
    try {
      const currentIssue = await issueService.getIssue(id);
      if (currentIssue === null) throw "Issue not found.";
      const validatedData = issueService._validateUpdates(
        currentIssue,
        issueUpdates
      );
      return currentIssue.update(validatedData);
    } catch (err) {
      throw err;
    }
  },

  /**
   * Cleans input from unallowed properties for new issue creation
   * @param {Object}      issueObject     -   Object with new issue data
   * @private
   */
  _pickAllowedCreationProperties: issueObject => {
    const allowedCreationData = _.pick(
      issueObject,
      ISSUE_CREATE_ALLOWED_PROPERTIES
    );
    return _.forOwn(allowedCreationData, value => value.trim());
  },

  /**
   * Cleans input from unallowed properties for issue update
   * @param {Object}      issueObject     -   Object with issue updates
   * @private
   */
  _pickAllowedUpdateProperties: issueObject => {
    const allowedUpdates = _.pick(issueObject, ISSUE_UPDATE_ALLOWED_PROPERTIES);
    return _.forOwn(allowedUpdates, value => value.trim());
  },

  /**
   *
   * @param issue
   * @param issueUpdates
   * @private
   */
  _validateUpdates: (issue, issueUpdates) => {
    const filteredUpdates = issueService._pickAllowedUpdateProperties(
      issueUpdates
    );
    if (!filteredUpdates.state) return issueUpdates;
    return issueService._validateState(issue.state, filteredUpdates.state)
      ? issueUpdates
      : {};
  },

  /**
   * Validates if state changes are correct
   * @param {String}        oldState       -   Current issue state
   * @param {String}        newState       -   New issue state
   * @returns {boolean}                    -   Whether update is allowed or not
   * @private
   */
  _validateState: (oldState, newState) => {
    if (oldState === newState) return true;
    if (
      oldState === "Closed" ||
      (oldState === "Pending" && newState === "Open")
    )
      return false;
    return true;
  }
};

module.exports = issueService;
