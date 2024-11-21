const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger options
const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'File Upload API',
        version: '1.0.0',
        description: 'API for uploading image and video files',
      },
      servers: [
        {
          url: 'http://localhost:3000/api',
        },
      ],
    },
    apis: ['./app/routes/*'], // Path to the route file
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);


module.exports = {
    swaggerDocs
}

