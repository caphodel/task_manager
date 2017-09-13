/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('drafttable', {
    week: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    count: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    user: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    tableName: 'drafttable'
  });
};
