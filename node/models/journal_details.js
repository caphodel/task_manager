/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('journal_details', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    journal_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    property: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: ''
    },
    prop_key: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: ''
    },
    old_value: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    value: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'journal_details'
  });
};
