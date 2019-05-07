const ISSUES_TABLE_NAME = "ston_models_issues";

/*
  Creates ISSUE MODEL
 */
module.exports = (database, DataTypes) => {
  return database.define(
    "Issue",
    {
      title: {
        allowNull: false,
        type: DataTypes.STRING,
        field: "title",
        validate: {
          len: [3, 64]
        }
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING,
        field: "description",
        validate: {
          len: [10, 1024]
        }
      },
      state: {
        defaultValue: "Open",
        type: DataTypes.ENUM,
        field: "state",
        values: ["Open", "Pending", "Closed"]
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE
    },
    {
      indexes: [
        {
          unique: false,
          fields: ['state']
        }
      ],
      tableName: ISSUES_TABLE_NAME,
      timestamp: false,
      underscored: true
    }
  );
};
