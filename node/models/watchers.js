/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('watchers', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    watchable_type: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    watchable_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'watchers'
  });
};
