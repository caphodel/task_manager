/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('oldsrm', {
    week: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    total: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    lembaga: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'oldsrm'
  });
};
