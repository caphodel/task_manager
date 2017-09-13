/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('show_create_triggers', {
    trigger_name: {
      type: DataTypes.STRING(64),
      allowNull: false,
      defaultValue: ''
    },
    sql: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'show_create_triggers'
  });
};
