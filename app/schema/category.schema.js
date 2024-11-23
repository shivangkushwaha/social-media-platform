const Joi=require("joi")

module.exports={
    categorySchema : Joi.object({
        name : Joi.string().required().example("name").messages({
                    "string.base": `Category name is required`,
                    "string.empty": `Category name can not be empty`,
                    "any.required": `Category name is required`
        }),
        id : Joi.string().uuid().optional().default(null),
        perentId : Joi.string().uuid().optional().default(null),
        status : Joi.number().optional().valid(1,0).default(null),
        isLive : Joi.number().optional().valid(1,0).default(null),
        attachment : Joi.string().uuid().optional().default(null)
    }),

    listSchema : Joi.object({
        limit:Joi.number().integer().optional().default(null),
        id :Joi.string().uuid().optional().default(null),
        page:Joi.number().integer().optional().default(1).min(1),
        sortBy:Joi.string().optional().default("name").valid("createdAt","name"),
        order:Joi.string().optional().default("ASC").valid("DESC","ASC"),
        search:Joi.string().optional().default(null)
    }),
    
    listSubSchema : Joi.object({
        limit: Joi.number().integer().optional().default(null),
        id : Joi.string().uuid().required().example("1251422125").messages({
            "string.base": `Category Id is required`,
            "string.empty": `Category Id can not be empty`,
            "any.required": `Category Id is required`
        }),
        page: Joi.number().integer().optional().default(1).min(1),
        sortBy: Joi.string().optional().default("id").valid("createdAt","id"),
        order: Joi.string().optional().default("ASC").valid("DESC","ASC"),
        search: Joi.string().optional().default(null)
    }),
    deleteSchema : Joi.object({
        id : Joi.string().uuid().required().example("uuid").messages({
            "string.base": `Category id is required`,
            "string.empty": `Category id can not be empty`,
            "any.required": `Category id is required`
}),
    })
}