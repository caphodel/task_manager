/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('repositories', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    project_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    login: {
      type: DataTypes.STRING(60),
      allowNull: true,
      defaultValue: ''
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: true,
      defaultValue: ''
    },
    root_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ''
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'repositories'
  });
};
