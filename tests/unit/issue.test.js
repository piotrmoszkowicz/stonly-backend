const issueService = require("@services/issue");

jest.mock("@models/issue", () => () => {
  const SequelizeMock = require("sequelize-mock");
  const dbMock = new SequelizeMock();
  return dbMock.define("Issue", {
    id: 1,
    title: "Test title2",
    description: "Test description2",
    state: "Open",
    createdAt: "2019-05-07T17:18:51.000Z",
    updatedAt: "2019-05-07T19:30:41.000Z"
  });
});

describe("Issues service", () => {
  it("should correctly get all issues", async () => {
    const issues = await issueService.getIssues();
    expect(issues).toHaveLength(1);
    expect(issues[0].id).toBe(1);
    expect(issues[0].title).toBe("Test title2");
    expect(issues[0].description).toBe("Test description2");
    expect(issues[0].state).toBe("Open");
  });

  it("should correctly get issue by id", async () => {
    const issue = await issueService.getIssue(1);
    expect(issue.id).toBe(1);
    expect(issue.title).toBe("Test title2");
    expect(issue.description).toBe("Test description2");
    expect(issue.state).toBe("Open");
  });

  it("should correctly update issue by id to Pending", async () => {
    const updates = {
      state: "Pending"
    };

    const updatedIssue = await issueService.updateIssue(1, updates);

    expect(updatedIssue.id).toBe(1);
    expect(updatedIssue.title).toBe("Test title2");
    expect(updatedIssue.description).toBe("Test description2");
    expect(updatedIssue.state).toBe("Pending");
  });

  it("should correctly update issue by id to Closed", async () => {
    const updates = {
      state: "Closed"
    };

    const updatedIssue = await issueService.updateIssue(1, updates);

    expect(updatedIssue.id).toBe(1);
    expect(updatedIssue.title).toBe("Test title2");
    expect(updatedIssue.description).toBe("Test description2");
    expect(updatedIssue.state).toBe("Closed");
  });

  it("should correctly delete issue by id", async () => {
    const result = await issueService.deleteIssue(1);

    expect(result).toBe(true);
  });
});
