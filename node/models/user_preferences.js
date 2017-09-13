/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_preferences', {
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
    others: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    hide_mail: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    time_zone: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'user_preferences'
  });
};
