"use strict";

module.exports = function(sequelize, DataTypes) {
  var Job = sequelize.define("Job", {
    title: {
      type: DataTypes.STRING,
      unique: true
    },
    begin: DataTypes.DATE,
    end: DataTypes.DATE,
    urgency: DataTypes.INTEGER,
    state: {
      type: DataTypes.ENUM,
      values: ['unassigned','in progress', 'done']
    }
  }, {
    classMethods: {
      associate: function(models) {
        Job.hasMany(models.Task)
      }
    }
  });

  return Job;
};
