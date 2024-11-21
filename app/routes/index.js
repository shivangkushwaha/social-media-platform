const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const routeFiles = fs.readdirSync(__dirname).filter(file => file !== 'index.js');

routeFiles.forEach(file => {
    const routePath = path.join(__dirname, file);
    const route = require(routePath);
    router.use(`/${path.parse(file).name}`, route);
});

module.exports = router;
