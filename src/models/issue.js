const ISSUE_MODEL = "ston_models_issue";

module.exports = (database, DataTypes) => {
  return database.define(
    ISSUE_MODEL,
    {
      title: {
        type: DataTypes.STRING,
        field: "title",
        validate: {
          len: {
            args: [3, 64],
            msg: "Issue's title must have between 3-64 characters"
          }
        }
      },
      description: {
        type: DataTypes.STRING,
        field: "description",
        validate: {
          len: {
            args: [10, 1024],
            msg: "Issue's description must have between 10-1024 characters"
          }
        }
      },
      state: {
        type: DataTypes.ENUM,
        field: "state",
        values: ["Open", "Pending", "Closed"]
      }
    },
    {
      underscored: true
    }
  );
};
