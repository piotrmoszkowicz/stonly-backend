const issueService = require("@services/issue");

jest.mock('@models/issue', () => () => {
  const SequelizeMock = require("sequelize-mock");
  const dbMock = new SequelizeMock();
  return dbMock.define('Issue',  {
    id: 1,
    title: "Test title2",
    description: "Test description2",
    state: "Pending",
    createdAt: "2019-05-07T17:18:51.000Z",
    updatedAt: "2019-05-07T19:30:41.000Z"
  });
});

describe("Issues service - do not update Pending", () => {
  it("should not update issue by id to Open from Pending", async () => {
    const updates = {
      state: "Open"
    };

    const updatedIssue = await issueService.updateIssue(1, updates);

    expect(updatedIssue.id).toBe(1);
    expect(updatedIssue.title).toBe("Test title2");
    expect(updatedIssue.description).toBe("Test description2");
    expect(updatedIssue.state).toBe("Pending");
  });
});
