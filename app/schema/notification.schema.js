const Joi=require("joi")

module.exports = {
    addNotificationSchema : Joi.object({
        uuid : Joi.string().uuid().optional().default(null),
        redirection : Joi.string().optional().default(null),
        title : Joi.string().required().example("title").messages({
            "string.base": `Title is required`,
            "string.empty": `Title can not be empty`,
            "any.required": `Title is required`
        }),
        description : Joi.string().required().example("description").messages({
            "string.base": `Description is required`,
            "string.empty": `Description can not be empty`,
            "any.required": `Description is required`
        }),
        expireTime : Joi.number().optional().example(0).default(0),
    }),
    
    listSchema : Joi.object({
        limit:Joi.number().integer().optional().default(null),
        id :Joi.string().uuid().optional().default(null),
        page:Joi.number().integer().optional().default(1).min(1),
        sortBy:Joi.string().optional().default("id").valid("createdAt","id"),
        order:Joi.string().optional().default("ASC").valid("DESC","ASC"),
        search:Joi.string().optional().default(null)
    }),

    readNotification : Joi.object({
        uuid : Joi.string().uuid().required().example("uuid").messages({
            "string.base": `UUID is required`,
            "string.empty": `UUID can not be empty`,
            "any.required": `UUID is required`
        })
    })

}