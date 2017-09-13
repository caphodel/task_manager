/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('srm', {
    srmid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    uuid: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: '0'
    },
    subject: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: '0'
    },
    value: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'srm'
  });
};
