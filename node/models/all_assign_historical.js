/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('all_assign_historical', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    tracker_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    project_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    subject: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    assigned_to_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    author_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    prop_key: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: ''
    },
    new_assigned_to_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    old_assigned_to_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'all_assign_historical'
  });
};
