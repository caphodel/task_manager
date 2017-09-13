/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('wiki_content_versions', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    wiki_content_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    page_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    author_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    data: {
      type: "LONGBLOB",
      allowNull: true
    },
    compression: {
      type: DataTypes.STRING(6),
      allowNull: true,
      defaultValue: ''
    },
    comments: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ''
    },
    updated_on: {
      type: DataTypes.DATE,
      allowNull: false
    },
    version: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'wiki_content_versions'
  });
};
