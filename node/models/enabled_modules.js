/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('enabled_modules', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    project_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'enabled_modules'
  });
};
