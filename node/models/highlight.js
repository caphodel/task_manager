/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('highlight', {
    task: {
      type: DataTypes.STRING(100),
      allowNull: false,
      primaryKey: true
    },
    td: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    tr: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    text: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'highlight'
  });
};
