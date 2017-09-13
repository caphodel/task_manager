/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('task_tracker_person', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    dept: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    user_id: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    feasibility_before_today: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    feasibility_all: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    feasibility_percent: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    design_before_today: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    design_all: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    design_percent: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    material_before_today: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    material_all: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    material_percent: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    week: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    installation_before_today: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    installation_all: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    installation_percent: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    tableName: 'task_tracker_person'
  });
};
