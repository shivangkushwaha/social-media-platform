const express = require('express');
const router = express.Router();
const {
  createAction,
  getActionsByQuery,
  deleteAction,
} = require('../controllers/action.controller'); // Adjust the path to your controller
const {
  createActionSchema,
  getActionsByQuerySchema,
  deleteActionSchema,
} = require('../schema/action.schema'); // Adjust the path to your Joi schemas
const { authentication } = require("../middleware/authentication.middlewares");
const {validator, queryValidator } = require("../middleware/validator.middlewares");
/**
 * @swagger
 * /like:
 *   post:
 *     summary: Create an action (like/dislike)
 *     tags: [Action]
 *     security:
 *       - bearerAuth: []  # Optional, assuming JWT auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: integer
 *                 description: The ID of the post to like or dislike
 *                 example: 5
 *               commentId:
 *                 type: integer
 *                 description: The ID of the comment to like or dislike (optional)
 *                 example: 3
 *               actionId:
 *                 type: integer
 *                 description: The action ID (e.g., 1 for like, 2 for dislike)
 *                 default: 1  # Default value for the like action
 *                 example: 1
 *     responses:
 *       201:
 *         description: Action created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Action'
 *       400:
 *         description: Invalid request or missing required fields
 *       500:
 *         description: Server error
 */

/**
 * @swagger
* /like:
 *   get:
 *     summary: Get actions (like/dislike) by query parameters
 *     tags: [Action]
 *     security:
 *       - bearerAuth: []  # Optional (JWT authentication)
 *     parameters:
 *       - name: postId
 *         in: query
 *         description: ID of the post to filter actions by
 *         required: false
 *         schema:
 *           type: integer
 *           example: 5
 *       - name: commentId
 *         in: query
 *         description: ID of the comment to filter actions by
 *         required: false
 *         schema:
 *           type: integer
 *           example: 3
 *       - name: limit
 *         in: query
 *         description: Number of actions to retrieve per page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *           example: 10
 *       - name: page
 *         in: query
 *         description: Page number for pagination (1-based index)
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *           minimum: 1
 *           example: 1
 *     responses:
 *       200:
 *         description: Successfully fetched the list of actions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalRecords:
 *                   type: integer
 *                   example: 50
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Action'
 *       400:
 *         description: Invalid query parameters (e.g., missing or invalid values)
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
* /like:
 *   get:
 *     summary: Get actions (like/dislike) by query parameters
 *     tags: [Action]
 *     security:
 *       - bearerAuth: []  # Optional (JWT authentication)
 *     parameters:
 *       - name: postId
 *         in: query
 *         description: ID of the post to filter actions by
 *         required: false
 *         schema:
 *           type: integer
 *           example: 5
 *       - name: commentId
 *         in: query
 *         description: ID of the comment to filter actions by
 *         required: false
 *         schema:
 *           type: integer
 *           example: 3
 *       - name: limit
 *         in: query
 *         description: Number of actions to retrieve per page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *           example: 10
 *       - name: page
 *         in: query
 *         description: Page number for pagination (1-based index)
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *           minimum: 1
 *           example: 1
 *     responses:
 *       200:
 *         description: Successfully fetched the list of actions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalRecords:
 *                   type: integer
 *                   example: 50
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Action'
 *       400:
 *         description: Invalid query parameters (e.g., missing or invalid values)
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
* /like:
 *   delete:
 *     summary: Delete by query 
 *     tags: [Action]
 *     security:
 *       - bearerAuth: []  # Optional (JWT authentication)
 *     parameters:
 *       - name: id
 *         in: query
 *         description: ID of the Action 
 *         required: true
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: Successfully deleted the list of actions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalRecords:
 *                   type: integer
 *                   example: 50
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Action'
 *       400:
 *         description: Invalid query parameters (e.g., missing or invalid values)
 *       500:
 *         description: Internal server error
 */

// Create a new action (like/dislike)
router.post('/like', validator(createActionSchema), authentication, createAction);

// // Get actions by query (filtering by postId, commentId, owner, etc.)
router.get('/like', queryValidator(getActionsByQuerySchema), authentication, getActionsByQuery);

// // Delete an action (like/dislike)
router.delete('/like', queryValidator(deleteActionSchema), authentication, deleteAction);

module.exports = router;