const Joi=require("joi")

module.exports= {

    create : Joi.object({
        uuid: Joi.string().uuid().required().messages({
            "string.base": `Attachment uuid is required`,
            "string.empty": `Attachment uuid can not be empty`,
            "any.required": `Attachment uuid is required`
        }),
        isLive : Joi.number().required().valid(1,0).messages({
            "string.base": `isLive is required`,
            "string.empty": `isLive can not be empty`,
            "any.required": `isLive is required`
        }),
        expireTime: Joi.number().integer().optional().default(null)
    }),
    
    list : Joi.object({
        limit:Joi.number().integer().optional().default(null),
        id :Joi.string().uuid().optional().default(null),
        page:Joi.number().integer().optional().default(1).min(1),
        sortBy:Joi.string().optional().default("id").valid("createdAt","id"),
        order:Joi.string().optional().default("ASC").valid("DESC","ASC"),
        search:Joi.string().optional().default(null)
    }),

    delete : Joi.object({
        id : Joi.string().uuid().required().example("uuid").messages({
            "string.base": `Tag id is required`,
            "string.empty": `Tag id can not be empty`,
            "any.required": `Tag id is required`
        })
    }),

    update : Joi.object({
        id : Joi.string().uuid().required().example("uuid").messages({
            "string.base": `Tag id is required`,
            "string.empty": `Tag id can not be empty`,
            "any.required": `Tag id is required`
        }),
        isLive : Joi.number().required().valid(1,0).messages({
            "string.base": `isLive is required`,
            "string.empty": `isLive can not be empty`,
            "any.required": `isLive is required`
        }),
    })
}