/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('closeddate', {
    journalized_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'closeddate'
  });
};
