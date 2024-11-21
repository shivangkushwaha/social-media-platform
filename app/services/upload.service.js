const multer = require('multer');
const path = require('path');
const appConstant = require('../appConstant');

// Define storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = `${process.cwd()}/${appConstant.STORAGE_FOLDER_NAME}`; // Local directory for uploads
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}`);
  },
});

// File filter for images and videos
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'video/mp4'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images and videos are allowed.'));
  }
};

// Multer upload configuration
const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // Limit: 50MB
  },
  fileFilter,
});

module.exports = upload;
