/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('attachments', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    container_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    container_type: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: ''
    },
    filename: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    disk_filename: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    filesize: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    content_type: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ''
    },
    digest: {
      type: DataTypes.STRING(40),
      allowNull: false,
      defaultValue: ''
    },
    downloads: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    author_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'attachments'
  });
};
