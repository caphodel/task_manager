/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tmpi', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    related_to: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    done_ratio: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    assigned_to: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'tmpi'
  });
};
