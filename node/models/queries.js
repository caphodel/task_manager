/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('queries', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    project_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    filters: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: '0'
    },
    is_public: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    column_names: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    sort_criteria: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    group_by: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'queries'
  });
};
