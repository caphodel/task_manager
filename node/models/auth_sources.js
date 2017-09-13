/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('auth_sources', {
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
      type: DataTypes.STRING(60),
      allowNull: false,
      defaultValue: ''
    },
    host: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    port: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    account: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    account_password: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    base_dn: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    attr_login: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    attr_firstname: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    attr_lastname: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    attr_mail: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    onthefly_register: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    tls: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'auth_sources'
  });
};
