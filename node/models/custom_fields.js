/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('custom_fields', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: ''
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: ''
    },
    field_format: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: ''
    },
    possible_values: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    regexp: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ''
    },
    min_length: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    max_length: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    is_required: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    is_for_all: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    is_filter: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    position: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '1'
    },
    searchable: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    default_value: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    editable: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '1'
    }
  }, {
    tableName: 'custom_fields'
  });
};
