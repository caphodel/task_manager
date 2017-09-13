/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('changes', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    changeset_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    action: {
      type: DataTypes.STRING(1),
      allowNull: false,
      defaultValue: ''
    },
    path: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    from_path: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    from_revision: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    revision: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    branch: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'changes'
  });
};
