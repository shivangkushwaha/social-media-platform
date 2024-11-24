const Joi = require('joi');

const followSchema = Joi.object({
  followerId: Joi.number().integer().required().messages({
    'number.base': 'Follower ID must be a number',
    'any.required': 'Follower ID is required',
  })
});

const listSchema =  Joi.object({
    limit:Joi.number().integer().optional().default(null),
    id :Joi.string().uuid().optional().default(null),
    page:Joi.number().integer().optional().default(1).min(1),
    sortBy:Joi.string().optional().default("id").valid("createdAt","id"),
    order:Joi.string().optional().default("ASC").valid("DESC","ASC"),
    search:Joi.string().optional().default(null)
})

module.exports = { followSchema, listSchema };
