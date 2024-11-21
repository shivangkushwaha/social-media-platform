const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const authMiddleware = require('../middleware/authMiddleware');
const {validator} = require("../middleware/validator.middlewares")
const schema = require('../schema/account.schema')
const upload = require('../services/upload.service');
const { uploadFile } = require('../controllers/attachment.controller');


/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload an image or video.
 *     tags: [File Upload]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: File uploaded successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: File uploaded successfully.
 *                 fileUrl:
 *                   type: string
 *                   example: uploads/1684373829473-sample.png
 *       400:
 *         description: No file uploaded or invalid file type.
 */
router.post('/upload', upload.single('file'), uploadFile);


module.exports = router;
