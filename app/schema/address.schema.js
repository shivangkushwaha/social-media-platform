const Joi=require("joi")

module.exports={
    createSchema : Joi.object({    
        uuid: Joi.string().uuid().optional().default(null),    
        name: Joi.string().required().messages({
            "string.base": `Name is required`,
            "string.empty": `Name can not be empty`,
            "any.required": `Name is required`
        }),
        houseNumber: Joi.string().optional().default(null),
        streetName: Joi.string().optional().default(null),
        locality: Joi.string().required().messages({
            "string.base": `Locality is required`,
            "string.empty": `Locality can not be empty`,
            "any.required": `Locality is required`
        }),
        city: Joi.string().required().messages({
            "string.base": `City is required`,
            "string.empty": `City can not be empty`,
            "any.required": `City is required`
        }),
        phone: Joi.string().required().messages({
            "string.base": `Contact Number is required`,
            "string.empty": `Contact Number can not be empty`,
            "any.required": `Contact Number is required`
        }),
        postalCode: Joi.number().integer().min(11111).max(9999999).required().messages({
            "string.base": `Postal Code is required`,
            "string.empty": `Postal Code can not be empty`,
            "any.required": `Postal Code is required`
        }),
        isDefault: Joi.number().integer().allow(1,0).optional().default(0),
        country: Joi.string().required().messages({
            "string.base": `Country is required`,
            "string.empty": `Country can not be empty`,
            "any.required": `Country is required`
        }),
        state: Joi.string().required().messages({
            "string.base": `State is required`,
            "string.empty": `State can not be empty`,
            "any.required": `State is required`
        })
    }),
    listSchema : Joi.object({
        limit: Joi.number().integer().optional().default(null),
        id: Joi.string().uuid().optional().default(null),
        page: Joi.number().integer().optional().default(1).min(1),
        sortBy: Joi.string().optional().default("id").valid("createdAt","id"),
        order: Joi.string().optional().default("ASC").valid("DESC","ASC")
    }),
    deleteSchema :Joi.object({
        uuid: Joi.string().uuid().required().messages({
            "string.base": `Id is required`,
            "string.empty": `Id can not be empty`,
            "any.required": `Id is required`
        })
    }),
}