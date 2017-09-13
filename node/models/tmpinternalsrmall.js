/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tmpinternalsrmall', {
    internalSrm: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    fs: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    d: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    i: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    m: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    tableName: 'tmpinternalsrmall'
  });
};
