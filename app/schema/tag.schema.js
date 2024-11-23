const Joi=require("joi")

module.exports={
    tagSchema : Joi.object({
        name : Joi.string().required().example("name").messages({
                    "string.base": `Tag title is required`,
                    "string.empty": `Tag title can not be empty`,
                    "any.required": `Tag title is required`
        }),
        id : Joi.string().uuid().optional().default(null),
        status : Joi.number().optional().valid(1,0).default(null),
        isLive : Joi.number().optional().valid(1,0).default(null)
    }),
    listSchema : Joi.object({
        limit:Joi.number().integer().optional().default(null),
        id :Joi.string().uuid().optional().default(null),
        page:Joi.number().integer().optional().default(1).min(1),
        sortBy:Joi.string().optional().default("id").valid("createdAt","id"),
        order:Joi.string().optional().default("ASC").valid("DESC","ASC"),
        search:Joi.string().optional().default(null)
    }),
    deleteSchema : Joi.object({
        id : Joi.string().uuid().required().example("uuid").messages({
            "string.base": `Tag id is required`,
            "string.empty": `Tag id can not be empty`,
            "any.required": `Tag id is required`
}),
    })
}