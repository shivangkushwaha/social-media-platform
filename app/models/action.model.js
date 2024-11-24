const appConstant = require("../appConstant");

module.exports = (sequelize, Sequelize) => {
    const Action = sequelize.define("Action", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        actionId : {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        postId : {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        commentId : {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        status : {
            type: Sequelize.INTEGER,
            allowNull: false ,
            defaultValue: appConstant.STATUS.INACTIVE
        },
        owner : {
            type: Sequelize.INTEGER,
            allowNull : false
        },
        uuid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        }
    },{
        tableName:"actions",
        paranoid: true,
        underscored: true
    });
    Action.associate = function(models) {
        Action.belongsTo(models.Post, {foreignKey: "postId"}),
        Action.belongsTo(models.Comment, {foreignKey: "commentId"}),
        Action.belongsTo(models.User, {foreignKey: "owner"})
    }
    return Action;
};