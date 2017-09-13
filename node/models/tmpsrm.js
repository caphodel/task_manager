/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tmpsrm', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    tracker_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    subject: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    priority_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    assigned_to: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'tmpsrm'
  });
};
