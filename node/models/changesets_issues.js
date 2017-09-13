/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('changesets_issues', {
    changeset_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    issue_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'changesets_issues'
  });
};
