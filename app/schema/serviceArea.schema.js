const Joi=require("joi")

module.exports={
    /* State Schema  */
    createState : Joi.object({    
        uuid: Joi.string().uuid().optional().default(null),    
        name: Joi.string().required().messages({
            "string.base": `State Name is required`,
            "string.empty": `State Name can not be empty`,
            "any.required": `State Name is required`
        }),
        isLive: Joi.number().integer().optional().default(1),
    }),

    listSchema : Joi.object({
        limit: Joi.number().integer().optional().default(null),
        id: Joi.string().uuid().optional().default(null),
        page: Joi.number().integer().optional().default(1).min(1),
        sortBy: Joi.string().optional().default("id").valid("createdAt","id"),
        search: Joi.string().optional().min(3).default(null),
        order: Joi.string().optional().default("ASC").valid("DESC","ASC")
    }),

    deleteSchema :Joi.object({
        uuid: Joi.string().uuid().required().messages({
            "string.base": `Id is required`,
            "string.empty": `Id can not be empty`,
            "any.required": `Id is required`
        })
    }),

    /* City Schema  */
    createCity : Joi.object({    
        id: Joi.string().uuid().optional().default(null),   
        stateId: Joi.string().uuid().required().messages({
            "string.base": `State uuid is required`,
            "string.empty": `State uuid can not be empty`,
            "any.required": `State uuid is required`
        }),  
        name: Joi.string().required().messages({
            "string.base": `City Name is required`,
            "string.empty": `City Name can not be empty`,
            "any.required": `City Name is required`
        }),
        isLive: Joi.number().integer().optional().default(1),
    }),

    listCity : Joi.object({
        limit: Joi.number().integer().optional().default(null),
        id: Joi.string().uuid().optional().default(null),
        stateId: Joi.string().uuid().optional().default(null),
        page: Joi.number().integer().optional().default(1).min(1),
        sortBy: Joi.string().optional().default("id").valid("createdAt","id"),
        search: Joi.string().optional().min(3).default(null),
        order: Joi.string().optional().default("ASC").valid("DESC","ASC")
    }),

    /* PIN code Schema  */
    createPIN : Joi.object({    
        id: Joi.string().uuid().optional().default(null),   
        cityId: Joi.string().uuid().required().messages({
            "string.base": `City uuid is required`,
            "string.empty": `City uuid can not be empty`,
            "any.required": `City uuid is required`
        }),  
        name: Joi.string().required().messages({
            "string.base": `PIN Code is required`,
            "string.empty": `PIN Code can not be empty`,
            "any.required": `PIN Code is required`
        }),
        isLive: Joi.number().integer().optional().default(1),
    }),

    listPIN : Joi.object({
        limit: Joi.number().integer().optional().default(null),
        id: Joi.string().uuid().optional().default(null),
        cityId: Joi.string().uuid().optional().default(null),
        page: Joi.number().integer().optional().default(1).min(1),
        sortBy: Joi.string().optional().default("id").valid("createdAt","id"),
        search: Joi.string().optional().min(3).default(null),
        order: Joi.string().optional().default("ASC").valid("DESC","ASC")
    })
    

}