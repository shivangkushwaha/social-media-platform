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
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         postId:
 *           type: integer
 *           example: 2
 *         content:
 *           type: string
 *           example: "This is a comment."
 *         patentId:
 *           type: integer
 *           example: 3
 *         owner:
 *           type: integer
 *           example: 1
 *         uuid:
 *           type: string
 *           format: uuid
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-11-24T15:45:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-11-24T15:45:00Z"
 *
 * /comment:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comment]
  *     security:
 *       - bearerAuth: []  # Optional
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       201:
 *         description: Comment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Invalid request or comment already exists
 *       500:
 *         description: Server error
 * 
 * /comment/{postId}:
 *   get:
 *     summary: Get comments for a specific post (including replies)
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []  # Optional
 *     parameters:
 *       - name: postId
 *         in: path
 *         required: true
 *         description: ID of the post to fetch comments for
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
 *           example: "javascript"
 *     responses:
 *       200:
 *         description: List of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 * 
 * /comment/{id}:
 *   get:
 *     summary: Get a specific comment by ID (with replies)
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []  # Optional
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the comment
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Comment details with replies
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 *   put:
 *     summary: Update a specific comment
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []  # Optional
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the comment to update
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       400:
 *         description: Invalid comment ID or content
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Delete a comment and its replies
 *     tags: [Comment]
 *     security:
 *       - bearerAuth: []  # Optional
 *     parameters:
 *       - name: id
 *         in: path
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
 */

// Create a new comment
router.post('/comment', validator(createCommentSchema), authentication, createComment);

// Get comments for a specific post (including replies)
router.get('/comment/:postId', queryValidator(getCommentsByPostSchema), authentication, getCommentsByPost);

// Get a specific comment by ID (with replies)
router.get('/comment', queryValidator(getCommentsByPostSchema), authentication, getCommentById);

// Update a comment
router.put('/comment', validator(updateCommentSchema), authentication, updateComment);

// Delete a comment and its replies
router.delete('/comment/:id', queryValidator(deleteCommentSchema), authentication, deleteComment);

module.exports = router;
