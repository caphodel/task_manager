/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tmpassign', {
    oldassign: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    newassign: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    id: {
      type: DataTypes.STRING(32767),
      allowNull: true
    }
  }, {
    tableName: 'tmpassign'
  });
};
