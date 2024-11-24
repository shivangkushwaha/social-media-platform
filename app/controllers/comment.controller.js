const { Comment, Post, User, Action, UserProfile } = require('../models'); // Adjust the path to your models
const { Op } = require('sequelize');
const { sendBadResponse, sendServerErrorResponse, sendSucessResponse } = require('./response.controller');
const appConstant = require('../appConstant');
const { getOffset } = require('../utils/helper');

// Create a new comment
const createComment = async (req, res) => {
    try {
        const { postId, content, patentId } = req.body;

        // Validate if it's a reply and the parent comment exists
        if (patentId) {
            const parentComment = await Comment.findByPk(patentId);
            if (!parentComment) {
                return sendBadResponse(res, 'Parent comment not found');
            }
        }

        // Create the comment
        const comment = await Comment.create({ postId, content, patentId, owner: req.auth.userId });

        return sendSucessResponse(res, 'Comment Added Successfully', comment ,appConstant.STATUS_CODE.CREATED)
    } catch (error) {
        return sendServerErrorResponse(res, error);
    }
};

// Get comments for a post (including replies)
const getCommentsByPost = async (req, res) => {
    try {
        let { limit, page, sortBy, order, id, postId } = req.query;

        // Apply default values for pagination and sorting
        limit = limit ? +limit : +process.env.LIMIT || 10;
        page = page ? +page : +process.env.PAGE || 1;
        sortBy = sortBy || "id";
        order = order || "DESC";
    
        // Calculate offset for pagination
           // Calculate offset for pagination
           const offset = getOffset(page, limit);

           // Build where condition dynamically based on query parameters
           const where = {};
           
           // If postId is provided, filter comments by postId
           if (postId) {
               where.postId = postId;
           }
   
           // If id is provided, filter by comment ID
           if (id) {
               where.id = id;
           }
   
           // Fetch comments for the given post (including replies)
           const comments = await Comment.findAndCountAll({
               where,
               include: [
                   {
                       model: Comment,
                       as: 'reply', // Alias for replies
                       include: [
                           {
                               model: User, 
                               attributes: ['id'],
                               include: [
                                   {
                                       model: UserProfile,
                                       attributes: ['name'],
                                       as: 'profile',
                                   },
                               ],
                           },
                       ],
                       required: false, // Replies are optional
                   },
                   {
                       model: User, 
                       attributes: ['id'],
                       include: [
                           {
                               model: UserProfile,
                               attributes: ['name'],
                               as: 'profile',
                           },
                       ],
                   },
               ],
               limit,
               offset,
               order: [[sortBy, order]], // Sorting by the given field and order
           });

        const returnData = {
            currentPage: page,
            totalPages: Math.ceil(comments.count / limit),
            totalItems: comments.count,
            data: comments.rows,
        }

        return sendSucessResponse(res, 'Comments Fetched siccessfully', returnData, appConstant.STATUS_CODE.OK);
    } catch (error) {
        return sendServerErrorResponse(res, error);

    }
};

// Update a comment
const updateComment = async (req, res) => {
    try {
        const { content,id } = req.body;

        const comment = await Comment.findByPk(id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        await comment.update({ content });

        return res.status(200).json({ message: 'Comment updated successfully', comment });
    } catch (error) {
        console.error('Error updating comment:', error);
        return res.status(500).json({ error: 'An error occurred while updating the comment' });
    }
};

// Delete a comment (and its replies)
const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findByPk(id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Delete the comment and its replies
        await Comment.destroy({ where: { [Op.or]: [{ id }, { patentId: id }] } });

        return res.status(200).json({ message: 'Comment and its replies deleted successfully' });
    } catch (error) {
        console.error('Error deleting comment:', error);
        return res.status(500).json({ error: 'An error occurred while deleting the comment' });
    }
};

// Get a single comment (with replies)
const getCommentById = async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findByPk(id, {
            include: [
                {
                    model: Comment,
                    as: 'Replies',
                    include: [{ model: User, attributes: ['id', 'name'] }],
                },
                { model: User, attributes: ['id', 'name'] }, // Include owner details
            ],
        });

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        return res.status(200).json(comment);
    } catch (error) {
        console.error('Error fetching comment:', error);
        return res.status(500).json({ error: 'An error occurred while fetching the comment' });
    }
};

module.exports = {
    createComment,
    getCommentsByPost,
    updateComment,
    deleteComment,
    getCommentById,
};
