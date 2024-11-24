const controller = require("../controllers/post.controller");
const router = require('express').Router();
const { postSchema, postUpdateSchema, listSchema } = require("../schema/post.schema");
const { scopeValidator } = require("../middleware/scope.middlewares");
const { authentication } = require("../middleware/authentication.middlewares");
const {validator, queryValidator } = require("../middleware/validator.middlewares");
/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []  # Optional
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the post
 *                 example: "My First Post"
 *                 required: true
 *               htmlTitle:
 *                 type: string
 *                 description: HTML-safe title of the post
 *                 example: "<h1>My First Post</h1>"
 *                 required: false
 *               content:
 *                 type: string
 *                 description: Content of the post
 *                 example: "This is the content of my first post."
 *                 required: true
 *               htmlContent:
 *                 type: string
 *                 description: HTML-safe content of the post
 *                 example: "<p>This is the content of my first post.</p>"
 *                 required: false
 *               coverImage:
 *                 type: integer
 *                 description: ID of the cover image
 *                 example: 5
 *                 required: false
 *               tags:
 *                 type: string
 *                 description: Tags associated with the post
 *                 example: "tech, javascript"
 *                 required: false
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post created successfully
 *                 post:
 *                   $ref: '#/components/schemas/Post'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 *   get:
 *     summary: Get all posts
 *     tags: [Post]
 *     responses:
 *       200:
 *         description: List of all posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: "My First Post"
 *         htmlTitle:
 *           type: string
 *           example: "<h1>My First Post</h1>"
 *         content:
 *           type: string
 *           example: "This is the content of my first post."
 *         htmlContent:
 *           type: string
 *           example: "<p>This is the content of my first post.</p>"
 *         coverImage:
 *           type: integer
 *           example: 5
 *         tags:
 *           type: string
 *           example: "tech, javascript"
 *         status:
 *           type: integer
 *           example: 1
 *         owner:
 *           type: integer
 *           example: 1
 *         uuid:
 *           type: string
 *           format: uuid
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 */


/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get a post by ID
 *     tags: [Post]
 *     security:
 *       - bearerAuth: []  # Optional
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the post
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Post retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 *   put:
 *     summary: Update a post
 *     tags: [Post]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the post to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatePost'
 *     responses:
 *       200:
 *         description: Post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post updated successfully
 *                 post:
 *                   $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Delete a post
 *     tags: [Post]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the post to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Post deleted successfully
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get a list of posts
 *     tags: [Post]
 *     parameters:
 *       - name: limit
 *         in: query
 *         description: Number of posts to retrieve
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *       - name: id
 *         in: query
 *         description: Filter by specific post UUID
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
 *         description: Search keyword
 *         required: false
 *         schema:
 *           type: string
 *           example: "javascript"
 *     responses:
 *       200:
 *         description: List of posts
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
 *                   example: 10
 *                 totalItems:
 *                   type: integer
 *                   example: 100
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Post'
 *       400:
 *         description: Invalid query parameters
 *       500:
 *         description: Server error
 */


router.post("/posts" , validator(postSchema), authentication, controller.createPost);
router.get("/posts" , queryValidator(listSchema),  controller.getAllPosts);

module.exports = router;
