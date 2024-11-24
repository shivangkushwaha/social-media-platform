const express = require('express');
const router = express.Router();
const {
    createComment,
    getCommentsByPost,
    updateComment,
    deleteComment,
    getCommentById,
} = require('../controllers/comment.controller');
const { createCommentSchema, getCommentsByPostSchema, updateCommentSchema, deleteCommentSchema } = require('../schema/comment.schema');
const { scopeValidator } = require("../middleware/scope.middlewares");
const { authentication } = require("../middleware/authentication.middlewares");
const {validator, queryValidator } = require("../middleware/validator.middlewares");

/**
 * @swagger
 * /comment:
 *   post:
 *     summary: Create a new comment
 *     description: Allows a user to create a new comment on a post. Optionally, a reply to a parent comment can be created by providing the `patentId`.
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []  # Optional
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: integer
 *                 description: ID of the post to comment on
 *                 example: 5
 *               content:
 *                 type: string
 *                 description: The content of the comment
 *                 example: "This is a comment."
 *               patentId:
 *                 type: integer
 *                 description: Optional parent comment ID if replying to a comment
 *                 example: 3
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 postId:
 *                   type: integer
 *                   example: 5
 *                 content:
 *                   type: string
 *                   example: "This is a comment."
 *                 patentId:
 *                   type: integer
 *                   example: 3
 *                 owner:
 *                   type: integer
 *                   example: 1
 *                 uuid:
 *                   type: string
 *                   example: "550e8400-e29b-41d4-a716-446655440000"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-11-24T15:45:00Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-11-24T15:45:00Z"
 *       400:
 *         description: Invalid request or content is missing
 *       500:
 *         description: Server error
 * 
 */


/**
 * @swagger
 * /comment:
 *   get:
 *     summary: Get all comments or filter by query parameters
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []  # Optional
 *     parameters:
 *       - name: postId
 *         in: query
 *         description: ID of the post to fetch comments for
 *         required: false
 *         schema:
 *           type: integer
 *           example: 5
 *       - name: limit
 *         in: query
 *         description: Number of comments to retrieve
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *       - name: page
 *         in: query
 *         description: Page number for pagination (1-based index)
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           example: 1
 *       - name: sortBy
 *         in: query
 *         description: Field to sort by
 *         required: false
 *         schema:
 *           type: string
 *           enum: [createdAt, id]
 *           default: id
 *           example: createdAt
 *       - name: order
 *         in: query
 *         description: Sort order
 *         required: false
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           default: ASC
 *           example: DESC
 *       - name: search
 *         in: query
 *         description: Search term to filter comments by
 *         required: false
 *         schema:
 *           type: string
 *           example: "comment text"
 *     responses:
 *       200:
 *         description: List of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Invalid query parameters
 *       500:
 *         description: Server error
 *   put:
 *     summary: Update a specific comment
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []  # Optional
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               content:
 *                 type: string
 *                 example: "Updated comment content"
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       400:
 *         description: Invalid comment ID or content
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Delete a comment and its replies
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []  # Optional
 *     parameters:
 *       - name: id
 *         in: query
 *         required: true
 *         description: ID of the comment to delete
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Comment and its replies deleted successfully
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 * 
 */


router.post('/comment', validator(createCommentSchema), authentication, createComment);
router.get('/comment', queryValidator(getCommentsByPostSchema), authentication, getCommentsByPost);
router.put('/comment', validator(updateCommentSchema), authentication, updateComment);
router.delete('/comment', queryValidator(deleteCommentSchema), authentication, deleteComment);

module.exports = router;
