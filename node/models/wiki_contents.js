/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('wiki_contents', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    page_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    author_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: true
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
    tableName: 'wiki_contents'
  });
};
