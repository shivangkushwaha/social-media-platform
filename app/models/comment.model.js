const appConstant = require("../appConstant");

module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("Comment", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        postId : {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        content : {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        status : {
            type: Sequelize.INTEGER,
            allowNull: false ,
            defaultValue: appConstant.STATUS.INACTIVE
        },
        patentId : {
            type: Sequelize.INTEGER,
            allowNull: true ,
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
        tableName:"comments",
        paranoid: true,
        underscored: true
    });
    Comment.associate = function(models) {
        Comment.belongsTo(models.Post, {foreignKey: "postId"}),
        Comment.belongsTo(models.Comment, {foreignKey: "commentId"}),
        Comment.belongsTo(models.User, {foreignKey: "owner"})
        Comment.hasMany(models.Comment, {foreignKey: "patentId"}),
        Comment.belongsTo(models.Comment, {foreignKey: "patentId"}),
        Comment.hasMany(models.Action , {foreignKey: "commentId"})
    }
    return Comment;
};