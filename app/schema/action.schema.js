const Joi = require('joi');

const createActionSchema = Joi.object({
  postId: Joi.number().integer().optional().messages({
    'number.base': 'Post ID must be a number',
  }),
  commentId: Joi.number().integer().optional().messages({
    'number.base': 'Comment ID must be a number',
  }),
  actionId :  Joi.number().integer().optional().default(1).messages({
    'number.base': 'Status must be a number',
  }),
});

const getActionsByQuerySchema = Joi.object({
  postId: Joi.number().integer().optional().messages({
    'number.base': 'Post ID must be a number',
  }),
  commentId: Joi.number().integer().optional().messages({
    'number.base': 'Comment ID must be a number',
  }),
  limit: Joi.number().integer().optional().default(10).messages({
    'number.base': 'Limit must be a number',
  }),
  page: Joi.number().integer().optional().default(1).min(1).messages({
    'number.base': 'Page must be a number',
  }),
});

const deleteActionSchema = Joi.object({
  id: Joi.number().integer().required().messages({
    'number.base': 'Action ID must be a number',
    'any.required': 'Action ID is required',
  }),
});

module.exports = {
  createActionSchema,
  getActionsByQuerySchema,
  deleteActionSchema,
};
