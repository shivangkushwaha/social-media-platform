
module.exports = (sequelize, Sequelize) => {
    const Attachment = sequelize.define(
        "Attachment",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            userId: { type: Sequelize.INTEGER, defaultValue: null },
            inUse: { type: Sequelize.TINYINT, defaultValue: 0 },
            uuid: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4},
            path: {  type: Sequelize.STRING, defaultValue: null },
            originalName: { type: Sequelize.STRING, defaultValue: null },
            mimeType: { type: Sequelize.STRING, defaultValue: null },
            uniqueName: { type: Sequelize.STRING, allowNull: false },
            extension: { type: Sequelize.STRING, defaultValue: null },
            size: { type: Sequelize.INTEGER, defaultValue: null, comment: "Size is stored in KB" },
        },
        {
            underscored: true,
            tableName: "attachments"
        }
    );
    return Attachment;
}