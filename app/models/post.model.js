    const appConstant = require("../appConstant");

    module.exports = (sequelize, Sequelize) => {
        const Post = sequelize.define("Post", {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false 
            },
            htmlTitle : {
                type: Sequelize.STRING,
                allowNull: true
            },
            content : {
                type: Sequelize.TEXT,
                allowNull: false 
            },
            htmlContent : {
                type: Sequelize.TEXT,
                allowNull: true  
            },
            coverImage : {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            tags : {
                type: Sequelize.STRING,
                allowNull: true  
            },
            status : {
                type: Sequelize.INTEGER,
                allowNull: false ,
                defaultValue: appConstant.STATUS.INACTIVE
            },
            owner : {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            uuid: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            }
        },{
            tableName:"posts",
            paranoid: true,
            underscored: true
        });
        Post.associate = function(models) {
            Post.belongsTo( models.User, {foreignKey : "owner"}),
            Post.belongsTo( models.Attachment, {foreignKey : "coverImage"}),
            Post.hasMany(models.Comment, {foreignKey : "postId"}),
            Post.hasMany(models.Action, {foreignKey : "postId"})
        }
        return Post;
    };