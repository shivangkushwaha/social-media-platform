const Joi=require("joi")

module.exports = {
    createAccountSchema : Joi.object({
        firstName: Joi.string().max(100).required(),
        lastName: Joi.string().max(100).required(),
        email: Joi.string().email().max(100).required(),
        phone: Joi.string().max(16).required(),
        password: Joi.string().min(6).max(50).required(),
        birthday: Joi.date().required()
    }),
    
    loginSchema : Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    })
}