const Joi = require('joi');

const postSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.base': `Title is required`,
    'string.empty': `Title cannot be empty`,
    'any.required': `Title is required`,
  }),
  htmlTitle: Joi.string().optional(),
  content: Joi.string().required().messages({
    'string.base': `Content is required`,
    'string.empty': `Content cannot be empty`,
    'any.required': `Content is required`,
  }),
  htmlContent: Joi.string().optional(),
  coverImage: Joi.number().integer().optional(),
  tags: Joi.string().optional()
});

const postUpdateSchema = Joi.object({
  title: Joi.string().optional(),
  htmlTitle: Joi.string().optional(),
  content: Joi.string().optional(),
  htmlContent: Joi.string().optional(),
  coverImage: Joi.number().integer().optional(),
  tags: Joi.string().optional(),
  status: Joi.number().integer().optional(),
});


const listSchema =  Joi.object({
    limit:Joi.number().integer().optional().default(null),
    id :Joi.string().uuid().optional().default(null),
    page:Joi.number().integer().optional().default(1).min(1),
    sortBy:Joi.string().optional().default("id").valid("createdAt","id"),
    order:Joi.string().optional().default("ASC").valid("DESC","ASC"),
    search:Joi.string().optional().default(null)
})

module.exports = { postSchema, postUpdateSchema, listSchema };
