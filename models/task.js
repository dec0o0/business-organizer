"use strict";

module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define("Task", {
    title: DataTypes.STRING,
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    classMethods: {
      associate: function(models) {
        Task.belongsTo(models.Job);
      }
    }
  });

  return Task;
};
