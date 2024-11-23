const express = require('express');
const router = express.Router();
const upload = require('../services/upload.service');
const { uploadFile, serveFile } = require('../controllers/attachment.controller');


/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload an image or video.
 *     tags: [Attachment]
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





/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: View an image by name
 *     description: Fetch an image stored in the local directory.
 *     tags: [Attachment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Name of the image file to fetch.
 *         schema:
 *           type: string
 *           example: sample.jpg
 *     responses:
 *       200:
 *         description: Successfully fetched the image.
 *         content:
 *           image/jpeg:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Image not found.
 */
router.get('/:id', serveFile);


module.exports = router;
