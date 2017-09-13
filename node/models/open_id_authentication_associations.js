/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('open_id_authentication_associations', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    issued: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    lifetime: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    handle: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    assoc_type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    server_url: {
      type: "BLOB",
      allowNull: true
    },
    secret: {
      type: "BLOB",
      allowNull: true
    }
  }, {
    tableName: 'open_id_authentication_associations'
  });
};
