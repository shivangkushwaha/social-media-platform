const Joi=require("joi")

module.exports={
  
    userListSchema:Joi.object({
        limit:Joi.number().integer().optional().default(null),
        page:Joi.number().integer().optional().default(1).min(1),
        sortBy:Joi.string().optional().default("id").valid("createdAt","id"),
        order:Joi.string().optional().default("ASC").valid("DESC","ASC"),
        search:Joi.string().optional().default(null)
    }),

    userDetailSchema:Joi.object({
        userId:Joi.number().integer().required().messages({
            "string.base": `User id is required`,
            "string.empty": `User id should not be empty`,
            "any.required": `User id is required`,
          }),
    }),

    changeStatusQuerySchema:Joi.object(
        {
            userId:Joi.number().integer().required().messages({
                "string.base": `User id is required`,
                "string.empty": `User id should not be empty`,
                "any.required": `User id is required`,
              })
        }
    ),

    statusSchema:Joi.object(
        {
            status:Joi.number().integer().allow(0,1).required().messages({
                "string.base": `User id is required`,
                "string.empty": `User id should not be empty`,
                "any.required": `User id is required`,
              }),
        }
    ),

    crateStaticContent: Joi.object({
        id : Joi.string().uuid().optional().default(null),
        name:Joi.string().required().messages({
            "string.base": `Name is required`,
            "string.empty": `Name should not be empty`,
            "any.required": `Name is required`,
        }),
        content:Joi.string().required().messages({
            "string.base": `Content is required`,
            "string.empty": `Content should not be empty`,
            "any.required": `Content is required`,
        }),
        isLive:Joi.number().required().valid(1,0).messages({
            "string.base": `Status is required`,
            "string.empty": `Status should not be empty`,
            "any.required": `Status is required`,
        }),
    })
}