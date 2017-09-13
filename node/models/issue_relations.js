/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('issue_relations', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    issue_from_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    issue_to_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    relation_type: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    delay: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'issue_relations'
  });
};
