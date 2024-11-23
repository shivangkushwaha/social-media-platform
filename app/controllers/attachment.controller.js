const { sendSucessResponse, sendBadResponse, sendServerErrorResponse } = require('./response.controller');
const appConstant = require('../appConstant');
const path = require('path');
const Fs = require('fs');
const Models = require("../models");
const success = require('../messages/success');
const mime = require('mime-types');

module.exports = {
    uploadFile: async (req, res) => {
        try {
            // Check if file is uploaded
            if (!req.file) {
                return sendBadResponse(res, 'No file uploaded.', appConstant.STATUS_CODE.BAD_REQUEST);
            }

            // Construct the file URL
            const fileUrl = path.join(process.cwd(), appConstant.STORAGE_FOLDER_NAME, req.file.filename);
            const fileName = crypto.randomUUID();
            const extension = path.extname(req.file.originalname);
            const { size } = Fs.statSync(fileUrl);
            const kb = Math.ceil(size / 1000);
            const fileDetails = {
                uniqueName: fileName,
                extension: extension,           
                path: fileUrl,
                size: kb,
                inUse: 0,
                originalName : req.file.originalname,
                uuid: fileName,
            }

            // save file destails to the db 
            let attachment = await Models.Attachment.create(fileDetails);
            return sendSucessResponse(
                res,
                success.FILE_UPLOADED_SUCCESSFULLY,
                attachment,
                appConstant.STATUS_CODE.OK
            );
        } catch (error) {
            // Handle unexpected errors
            return sendServerErrorResponse(res, error);
        }
    },

    serveFile : async (req, res) => {
        try {
            
            let attachment = await Models.Attachment.findOne({where :{
                uuid : req.params.id
            }, raw : true});
            const imagePath = attachment.path;
            if(!attachment){
                return sendBadResponse(res, 'File not found.', appConstant.STATUS_CODE.NOT_FOUND);
            }
            const fileExtension = attachment.extension;

            // Supported file extensions and MIME types
            const supportedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
            const mimeType = mime.lookup(fileExtension);
        
            // Validate file extension
            if (!supportedExtensions.includes(fileExtension)) {
                return res.status(400).send('Invalid file extension.');
            }
        
            // Validate MIME type
            if (!mimeType || !mimeType.startsWith('image/')) {
                return sendBadResponse(res, 'Invalid MIME type.', appConstant.STATUS_CODE.BAD_REQUEST);
            }

            res.setHeader('Content-Type', mimeType);
        
            // Serve the image if validations pass
            return res.sendFile(imagePath, (err) => {
                if (err) {
                    return sendBadResponse(res, 'Resource Not Found', appConstant.STATUS_CODE.BAD_REQUEST);
                }
            });
        } catch (error) {
            // Handle unexpected errors
            return sendServerErrorResponse(res, error);
        }
    }
}

