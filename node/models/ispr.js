/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ispr', {
    taskNumber: {
      type: DataTypes.STRING(25),
      allowNull: false,
      primaryKey: true
    },
    tabNumber: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'ispr'
  });
};
