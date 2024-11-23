const Joi=require("joi")

module.exports={

    createSchema : Joi.object({
        name : Joi.string().required().example("name").messages({
                    "string.base": `Product Name is required`,
                    "string.empty": `Product Name can not be empty`,
                    "any.required": `Product Name is required`
        }),
        discription : Joi.string().required().example("discription").messages({
            "string.base": `Product Discription is required`,
            "string.empty": `Product Discription can not be empty`,
            "any.required": `Product Discription is required`
        }),
        brand : Joi.string().required().example("discription").messages({
            "string.base": `Product Brand is required`,
            "string.empty": `Product Brand can not be empty`,
            "any.required": `Product Brand is required`
        }),
        discriptionHtml : Joi.string().required().example("discriptionHtml").messages({
            "string.base": `Product Discription Html is required`,
            "string.empty": `Product Discription Html can not be empty`,
            "any.required": `Product Discription Html is required`
        }),
        definition : Joi.string().required().example("discriptionHtml").messages({
            "string.base": `Product Definition is required`,
            "string.empty": `Product Definition can not be empty`,
            "any.required": `Product Definition is required`
        }),
        marketPrice : Joi.number().min(0.01).required().example(1.10).messages({
            "string.base": `Market Price is required`,
            "string.empty": `Market Price can not be empty`,
            "any.required": `Market Price is required`
        }),
        discount : Joi.number().min(0).max(100).required().example(1.1).messages({
            "string.base": `Discount Percentages is required`,
            "string.empty": `Discount Percentages can not be empty`,
            "any.required": `Discount Percentages is required`
        }),
        stock : Joi.number().min(1).required().example(1).messages({
            "string.base": `Available quantity is required`,
            "string.empty": `Available quantity can not be empty`,
            "any.required": `Available quantity is required`
        }),
        isSizeChart: Joi.number().integer().allow(1,0).default(0).example(1),
        dimantions : Joi.object().optional().default({}).example({"heigh":1, "width":2, "breath":1}),
        properties : Joi.object().optional().default({}).example({"keyFeatures":"demo"}),
        attribute  : Joi.object().optional().default({}).example({"uuid":["value1","value2"],"uuid":["value1","value2"]}),
        categoryId : Joi.string().uuid().required().example("uuid").messages({
            "string.base": `Category is required`,
            "string.empty": `Category can not be empty`,
            "any.required": `Category is required`
        }),
        image : Joi.string().uuid().required().example("uuid").messages({
            "string.base": `Product Image is required`,
            "string.empty": `Product Image can not be empty`,
            "any.required": `Product Image is required`
        }),
        deliveryCharges : Joi.number().min(0).required().example(1.10).messages({
            "string.base": `Delivery Charges is required`,
            "string.empty": `Delivery Charges can not be empty`,
            "any.required": `Delivery Charges is required`
        }),
        attachments : Joi.array().items(Joi.string().uuid()).optional().default([]).example(["uuid","uuid"]),
        tags : Joi.array().items(Joi.string().uuid()).optional().default([]).example(["uuid","uuid"])
        
    }),

    listSchema : Joi.object({
        limit:Joi.number().integer().optional().default(null),
        id :Joi.string().uuid().optional().default(null),
        page:Joi.number().integer().optional().default(1).min(1),
        categoryId: Joi.string().uuid().optional().default(null),
        sortBy:Joi.string().optional().default("id").valid("createdAt","id"),
        order:Joi.string().optional().default("ASC").valid("DESC","ASC"),
        search:Joi.string().optional().default(null)
    }),
    
    homeListSchema : Joi.object({
        limit:Joi.number().integer().optional().default(null),
        id :Joi.string().uuid().optional().default(null),
        page:Joi.number().integer().optional().default(1).min(1),
        categoryId: Joi.string().uuid().optional().default(null),
        sortBy:Joi.string().optional().default("id").valid("createdAt","id"),
        order:Joi.string().optional().default("ASC").valid("DESC","ASC"),
        isNewArrival:Joi.number().integer().optional().default(null),
        isBestSeller:Joi.number().integer().optional().default(null),
        isTrending:Joi.number().integer().optional().default(null),
        search:Joi.string().optional().default(null)
    }),

    updateSchema : Joi.object({
        id : Joi.string().uuid().required().example("name").messages({
            "string.base": `Product UUID is required`,
            "string.empty": `Product UUID can not be empty`,
            "any.required": `Product UUID is required`
        }),
        name : Joi.string().required().example("name").messages({
                    "string.base": `Product Name is required`,
                    "string.empty": `Product Name can not be empty`,
                    "any.required": `Product Name is required`
        }),
        discription : Joi.string().required().example("discription").messages({
            "string.base": `Product Discription is required`,
            "string.empty": `Product Discription can not be empty`,
            "any.required": `Product Discription is required`
        }),
        brand : Joi.string().required().example("discription").messages({
            "string.base": `Product Brand is required`,
            "string.empty": `Product Brand can not be empty`,
            "any.required": `Product Brand is required`
        }),
        discriptionHtml : Joi.string().required().example("discriptionHtml").messages({
            "string.base": `Product Discription Html is required`,
            "string.empty": `Product Discription Html can not be empty`,
            "any.required": `Product Discription Html is required`
        }),
        definition : Joi.string().required().example("discriptionHtml").messages({
            "string.base": `Product Definition is required`,
            "string.empty": `Product Definition can not be empty`,
            "any.required": `Product Definition is required`
        }),
        marketPrice : Joi.number().min(0.01).required().example(1.10).messages({
            "string.base": `Market Price is required`,
            "string.empty": `Market Price can not be empty`,
            "any.required": `Market Price is required`
        }),
        discount : Joi.number().min(0).max(100).required().example(1.1).messages({
            "string.base": `Discount Percentages is required`,
            "string.empty": `Discount Percentages can not be empty`,
            "any.required": `Discount Percentages is required`
        }),
        stock : Joi.number().min(1).required().example(1).messages({
            "string.base": `Available quantity is required`,
            "string.empty": `Available quantity can not be empty`,
            "any.required": `Available quantity is required`
        }),
        isSizeChart: Joi.number().integer().default(null).example(1),
        dimantions : Joi.object().optional().default({}).example({"heigh":1, "width":2, "breath":1}),
        properties : Joi.object().optional().default({}).example({"keyFeatures":"demo"}),
        categoryId : Joi.string().uuid().required().example("uuid").messages({
            "string.base": `Category is required`,
            "string.empty": `Category can not be empty`,
            "any.required": `Category is required`
        }),
        image : Joi.string().uuid().required().example("uuid").messages({
            "string.base": `Product Image is required`,
            "string.empty": `Product Image can not be empty`,
            "any.required": `Product Image is required`
        }),
        deliveryCharges : Joi.number().min(0).required().example(1.10).messages({
            "string.base": `Delivery Charges is required`,
            "string.empty": `Delivery Charges can not be empty`,
            "any.required": `Delivery Charges is required`
        }),
        attachments : Joi.array().items(Joi.string().uuid()).optional().default([]).example(["uuid","uuid"]),
        tags : Joi.array().items(Joi.string().uuid()).optional().default([]).example(["uuid","uuid"])
        
    }),
    
    publishSchema : Joi.object({
        id: Joi.string().uuid().required().example("name").messages({
            "string.base": `Product UUID is required`,
            "string.empty": `Product UUID can not be empty`,
            "any.required": `Product UUID is required`
        }),
        isLive: Joi.number().integer().required().example(1).messages({
            "string.base": `Product Status is required`,
            "string.empty": `Product Status can not be empty`,
            "any.required": `Product Status is required`
        }) 
    }),

    detailsSchema : Joi.object({
        id : Joi.string().uuid().required().example("uuid").messages({
            "string.base": `Product Id is required`,
            "string.empty": `Product Id can not be empty`,
            "any.required": `Product Id is required`
        }),
    })
}