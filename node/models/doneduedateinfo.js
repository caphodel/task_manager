/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('doneduedateinfo', {
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0',
      primaryKey: true
    },
    role: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    done: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    tracker_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'doneduedateinfo'
  });
};
