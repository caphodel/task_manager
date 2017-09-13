/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('time_entries', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    project_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    issue_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    hours: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    comments: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    activity_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    spent_on: {
      type: DataTypes.DATE,
      allowNull: false
    },
    tyear: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    tmonth: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    tweek: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updated_on: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'time_entries'
  });
};
