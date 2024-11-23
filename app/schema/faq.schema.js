const Joi=require("joi")

module.exports={
    categorySchema : Joi.object({
        name : Joi.string().required().example("name").messages({
                    "string.base": `Category name is required`,
                    "string.empty": `Category name can not be empty`,
                    "any.required": `Category name is required`
        }),
        id : Joi.string().uuid().optional().default(null),
        isLive : Joi.number().optional().valid(1,0).default(null),
    }),

    listCategorySchema : Joi.object({
        limit:Joi.number().integer().optional().default(null),
        id :Joi.string().uuid().optional().default(null),
        page:Joi.number().integer().optional().default(1).min(1),
        sortBy:Joi.string().optional().default("name").valid("createdAt","name"),
        order:Joi.string().optional().default("ASC").valid("DESC","ASC"),
        search:Joi.string().optional().default(null)
    }),
    
    deleteCategorySchema : Joi.object({
        id : Joi.string().uuid().required().example("uuid").messages({
            "string.base": `Tag id is required`,
            "string.empty": `Tag id can not be empty`,
            "any.required": `Tag id is required`
        }),
    }),

    /** schema For handle Questions */
    createQuestionSchema : Joi.object({
        question : Joi.string().required().example("name").messages({
                    "string.base": `Question is required`,
                    "string.empty": `Question can not be empty`,
                    "any.required": `Question is required`
        }),
        answer : Joi.string().required().example("name").messages({
            "string.base": `Answer is required`,
            "string.empty": `Answer can not be empty`,
            "any.required": `Answer is required`
        }),
        faqCategoryId:  Joi.string().uuid().required().example("uuid").messages({
            "string.base": `faqCategoryId is required`,
            "string.empty": `faqCategoryId can not be empty`,
            "any.required": `faqCategoryId is required`
        }),
        id : Joi.string().uuid().optional().default(null),
        isLive : Joi.number().optional().valid(1,0).default(null),
    }),
    listQuestionSchema : Joi.object({
        limit:Joi.number().integer().optional().default(null),
        id :Joi.string().uuid().optional().default(null),
        faqCategoryId :Joi.string().uuid().required().example("uuid").messages({
            "string.base": `faqCategoryId is required`,
            "string.empty": `faqCategoryId can not be empty`,
            "any.required": `faqCategoryId is required`
        }),
        page:Joi.number().integer().optional().default(1).min(1),
        sortBy:Joi.string().optional().default("name").valid("createdAt","name"),
        order:Joi.string().optional().default("ASC").valid("DESC","ASC"),
        search:Joi.string().optional().default(null)
    }),
}