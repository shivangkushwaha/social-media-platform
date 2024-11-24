const appConstant = require("../appConstant");

module.exports = (sequelize, Sequelize) => {
    const Follows = sequelize.define("Follows", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
      
        followerId : {
            type: Sequelize.INTEGER,
            allowNull: false ,
        },
        followeeId : {
            type: Sequelize.INTEGER,
            allowNull : false
        },
        uuid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        }
    },{
        tableName:"follows",
        paranoid: true,
        underscored: true
    });
    Follows.associate = function(models) {
        Follows.belongsTo(models.User, {foreignKey: "followerId"}),
        Follows.belongsTo(models.User, {foreignKey: "followeeId"})
        
    }
    return Follows;
};