/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tokens', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    action: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: ''
    },
    value: {
      type: DataTypes.STRING(40),
      allowNull: false,
      defaultValue: ''
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'tokens'
  });
};
