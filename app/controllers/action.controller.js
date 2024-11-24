const { Action, Post, Comment, User } = require('../models');
const { sendBadResponse, sendSucessResponse, sendServerErrorResponse, responseForGet } = require('./response.controller');  // Adjust the path
const { Op } = require('sequelize');
const appConstant = require('../appConstant'); // Adjust the path for app constants

// Controller for creating an action (like/dislike)
const createAction = async (req, res) => {
  try {
    const { postId, commentId, status, actionId } = req.body;

    // Check if action already exists and remove the last one (like/dislike behavior)
    const existingAction = await Action.findOne({
      where: {
        actionId,
        postId,
        commentId,
        owner: req.auth.UserId,
      },
      order: [['createdAt', 'DESC']], // Fetch the latest action
    });

    if (existingAction) {
      await Action.update({ where: { id: existingAction.id } }, {status});
    }


    // Create the new action (like/dislike)
    const newAction = await Action.create({
      actionId,
      postId,
      commentId,
      owner,
      status,
    });

    return sendSucessResponse(res, 'Action created successfully', newAction, appConstant.STATUS_CODE.CREATED);
  } catch (error) {
    console.error('Error creating action:', error);
    return sendServerErrorResponse(res, error);
  }
};

// Controller for getting actions by query (filters)
const getActionsByQuery = async (req, res) => {
  try {
    const { postId, commentId, owner, limit, page } = req.query;

    const offset = (page - 1) * limit;

    const actions = await Action.findAndCountAll({
      where: {
        postId: postId ? postId : { [Op.ne]: null },
        commentId: commentId ? commentId : { [Op.ne]: null },
        owner,
      },
      include: [
        { model: Post },
        { model: Comment },
        { model: User, as: 'owner' },
      ],
      limit,
      offset,
    });

    const response = responseForGet(limit, actions.count, Math.ceil(actions.count / limit), page, actions.rows);

    return sendSucessResponse(res, 'Actions fetched successfully', response, appConstant.STATUS_CODE.OK);
  } catch (error) {
    console.error('Error fetching actions:', error);
    return sendServerErrorResponse(res, error);
  }
};

// Controller for deleting an action
const deleteAction = async (req, res) => {
  try {
    const { actionId } = req.body;

    const action = await Action.findByPk(actionId);
    if (!action) {
      return sendBadResponse(res, 'Action not found', appConstant.STATUS_CODE.NOT_FOUND);
    }

    await Action.destroy({ where: { id: actionId } });

    return sendSucessResponse(res, 'Action deleted successfully', {}, appConstant.STATUS_CODE.OK);
  } catch (error) {
    console.error('Error deleting action:', error);
    return sendServerErrorResponse(res, error);
  }
};

module.exports = {
  createAction,
  getActionsByQuery,
  deleteAction,
};
