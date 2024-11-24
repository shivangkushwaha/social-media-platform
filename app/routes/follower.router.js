const express = require('express');
const router = express.Router();
const { followUser, unfollowUser, getFollowers, getFollowing } = require('../controllers/follower.Controller');
const { followSchema,listSchema } = require('../schema/follower.schema');
const { scopeValidator } = require("../middleware/scope.middlewares");
const { authentication } = require("../middleware/authentication.middlewares");
const {validator, queryValidator } = require("../middleware/validator.middlewares");

/**
 * @swagger
 * /follow:
 *   post:
 *     summary: Follow a user
 *     tags: [Follow]
  *     security:
 *       - bearerAuth: []  # Optional
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               followerId:
 *                 type: integer
 *                 description: ID of the follower
 *                 example: 1
 *     responses:
 *       201:
 *         description: User followed successfully
 *       400:
 *         description: Invalid request or already following the user
 *       500:
 *         description: Server error
 *
 * /unfollow:
 *   post:
 *     summary: Unfollow a user
 *     tags: [Follow]
  *     security:
 *       - bearerAuth: []  # Optional
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               followerId:
 *                 type: integer
 *                 description: ID of the follower
 *                 example: 1
 *     responses:
 *       200:
 *         description: User unfollowed successfully
 *       404:
 *         description: Follow relationship not found
 *       500:
 *         description: Server error
 *
 * /followers:
 *   get:
 *     summary: Get followers of a user
 *     tags: [Follow]
 *     security:
 *       - bearerAuth: []  # Optional
 *     parameters:
 *       - name: limit
 *         in: query
 *         description: Number of followers to retrieve
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *       - name: id
 *         in: query
 *         description: Filter followers by a specific ID
 *         required: false
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "550e8400-e29b-41d4-a716-446655440000"
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
 *         description: Search term to filter followers
 *         required: false
 *         schema:
 *           type: string
 *           example: "john"
 *     responses:
 *       200:
 *         description: List of followers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *                 totalItems:
 *                   type: integer
 *                   example: 50
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 2
 *                       name:
 *                         type: string
 *                         example: "John Doe"
 *                       email:
 *                         type: string
 *                         example: "john.doe@example.com"
 *       500:
 *         description: Server error
 *
 * /following:
 *   get:
 *     summary: Get users a user is following
 *     tags: [Follow]
  *     security:
 *       - bearerAuth: []  # Optional
 *     parameters:
 *       - name: limit
 *         in: query
 *         description: Number of following users to retrieve
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *       - name: id
 *         in: query
 *         description: Filter following users by a specific ID
 *         required: false
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "123e4567-e89b-12d3-a456-426614174000"
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
 *         description: Search term to filter following users
 *         required: false
 *         schema:
 *           type: string
 *           example: "jane"
 *     responses:
 *       200:
 *         description: List of following users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 3
 *                 totalItems:
 *                   type: integer
 *                   example: 30
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 5
 *                       name:
 *                         type: string
 *                         example: "Jane Smith"
 *                       email:
 *                         type: string
 *                         example: "jane.smith@example.com"
 *       500:
 *         description: Server error
 */

// Follow a user
router.post('/follow', validator(followSchema), authentication, followUser);

// Unfollow a user
router.post('/unfollow', validator(followSchema), authentication, unfollowUser);

// Get followers of a user
router.get('/followers', queryValidator(listSchema), authentication, getFollowers);

// Get following of a user
router.get('/following', queryValidator(listSchema) ,authentication, getFollowing);

module.exports = router;
