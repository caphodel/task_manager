/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('fs_per_week', {
    year: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    week: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    dept: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: '',
      primaryKey: true
    },
    total: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    target: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: '0000-00-00',
      primaryKey: true
    }
  }, {
    tableName: 'fs_per_week'
  });
};
