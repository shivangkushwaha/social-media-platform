const Joi = require('joi');

const createCommentSchema = Joi.object({
  postId: Joi.number().integer().optional().messages({
    'number.base': 'Post ID must be a number',
  }),
  content: Joi.string().required().messages({
    'string.base': 'Content must be a string',
    'string.empty': 'Content cannot be empty',
    'any.required': 'Content is required',
  }),
  patentId: Joi.number().integer().optional().messages({
    'number.base': 'Patent ID must be a number',
  })
});

const getCommentsByPostSchema = Joi.object({
    postId: Joi.number().integer().required().messages({
      'number.base': 'Post ID must be a number',
      'any.required': 'Post ID is required',
    }), limit:Joi.number().integer().optional().default(null),
    id :Joi.string().uuid().optional().default(null),
    page:Joi.number().integer().optional().default(1).min(1),
    sortBy:Joi.string().optional().default("id").valid("createdAt","id"),
    order:Joi.string().optional().default("ASC").valid("DESC","ASC"),
    search:Joi.string().optional().default(null)
  });
 
const updateCommentSchema = Joi.object({
    id: Joi.number().integer().required().messages({
        'number.base': 'Comment ID must be a number',
        'any.required': 'Comment ID is required',
    }),
    content: Joi.string().required().messages({
        'string.base': 'Content must be a string',
        'string.empty': 'Content cannot be empty',
        'any.required': 'Content is required',
    }),
});

const deleteCommentSchema = Joi.object({
    id: Joi.number().integer().required().messages({
        'number.base': 'Comment ID must be a number',
        'any.required': 'Comment ID is required',
    }),
});

  
module. exports = {
    createCommentSchema,
    getCommentsByPostSchema,
    updateCommentSchema,
    deleteCommentSchema,
}