/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('due_date_tmp', {
    issue_open: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    issue_closed: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    assigned_to_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    tracker_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    dept: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'due_date_tmp'
  });
};
