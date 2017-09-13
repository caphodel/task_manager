/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('changesets', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    repository_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    revision: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    committer: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    committed_on: {
      type: DataTypes.DATE,
      allowNull: false
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    commit_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    scmid: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'changesets'
  });
};
