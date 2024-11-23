const Joi=require("joi")

module.exports={
    createSchema : Joi.object({
        addressId: Joi.string().uuid().required().example("uuid").messages({
            "string.base": `Address is required`,
            "string.empty": `Address can not be empty`,
            "any.required": `Address is required`
        }),
        products: Joi.array().items().min(1).required().messages({
            "string.base": `Products is required`,
            "string.empty": `Products can not be empty`,
            "any.required": `Products is required`
        })
    }),

    listSchema : Joi.object({
        limit:Joi.number().integer().optional().default(null),
        page:Joi.number().integer().optional().default(1).min(1),
        sortBy:Joi.string().optional().default("id").valid("createdAt","id"),
        order:Joi.string().optional().default("ASC").valid("DESC","ASC")
    }),

    detailSchema : Joi.object({
        id :Joi.string().uuid().required().messages({
            "string.base": `Products is required`,
            "string.empty": `Products can not be empty`,
            "any.required": `Products is required`
        })
    }),
    updateSchema : Joi.object({
        id :Joi.string().uuid().required().messages({
            "string.base": `Products is required`,
            "string.empty": `Products can not be empty`,
            "any.required": `Products is required`
        }),
        status : Joi.string().allow("PLACED","PREPARING_FOR_PICKUP","READY_FOR_PICKUP","ARRIVING_SOON","DELIVERD","CANCELLED","RETURURN_REQUESTED","RETURN_ACCEPTED","RETURN_COMPLTETED","CLOSED")
    })
}