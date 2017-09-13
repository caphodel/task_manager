/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('due_date_datathisweek', {
    week: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    issue_open: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    issue_closed: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    tracker_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    assigned_to_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    counter: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    sum_open: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    sum_closed: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    total_open: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    total_closed: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    dept: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    flag: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'due_date_datathisweek'
  });
};
