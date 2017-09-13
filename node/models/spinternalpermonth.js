/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('spinternalpermonth', {
    uuid: {
      type: DataTypes.DATE,
      allowNull: false
    },
    jumlah_po: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    jumlah_pd: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    jumlah_se_g: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    jumlah_se_k: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    jumlah_sd: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    jumlah_es: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    jumlah_el: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    jumlah_ge: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    jumlah_pr: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    jumlah_all: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: 'spinternalpermonth'
  });
};
