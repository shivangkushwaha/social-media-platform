const Joi=require("joi")

module.exports={
    createSchema : Joi.object({        
        productId: Joi.string().uuid().required().messages({
            "string.base": `Product Id is required`,
            "string.empty": `Product Id can not be empty`,
            "any.required": `Product Id is required`
        }),
        quantity: Joi.number().integer().allow(1,-1).required().messages({
            "string.base": `Quantity is required`,
            "string.empty": `Quantity can not be empty`,
            "any.required": `Quantity is required`
        }),
    }),
    listSchema : Joi.object({
        limit: Joi.number().integer().optional().default(null),
        perentId: Joi.string().uuid().optional().default(null),
        id: Joi.string().uuid().optional().default(null),
        page: Joi.number().integer().optional().default(1).min(1),
        sortBy: Joi.string().optional().default("id").valid("createdAt","id"),
        order: Joi.string().optional().default("ASC").valid("DESC","ASC"),
        search: Joi.string().optional().default(null)
    }),
    deleteSchema : Joi.object({        
        productId: Joi.string().uuid().required().messages({
            "string.base": `Product Id is required`,
            "string.empty": `Product Id can not be empty`,
            "any.required": `Product Id is required`
        })
    }),
}