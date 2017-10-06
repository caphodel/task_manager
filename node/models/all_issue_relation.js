/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('all_issue_relation', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            defaultValue: '0'
        },
        related_to: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            defaultValue: '0'
        }
    }, {
        tableName: 'all_issue_relation'
    });
};
