/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    login: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: ''
    },
    hashed_password: {
      type: DataTypes.STRING(40),
      allowNull: false,
      defaultValue: ''
    },
    firstname: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: ''
    },
    lastname: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: ''
    },
    mail: {
      type: DataTypes.STRING(60),
      allowNull: false,
      defaultValue: ''
    },
    mail_notification: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '1'
    },
    admin: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '1'
    },
    last_login_on: {
      type: DataTypes.DATE,
      allowNull: true
    },
    language: {
      type: DataTypes.STRING(5),
      allowNull: true,
      defaultValue: ''
    },
    auth_source_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_on: {
      type: DataTypes.DATE,
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    identity_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'users'
  });
};
