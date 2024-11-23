const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger options
const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Social Media API',
        version: '1.0.0',
        description: 'API for Social Media App',
      },
      servers: [
        {
          url: `http://localhost:${process.env.NODE_PORT}/api`,
        },
      ],
      components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT', // Optional, specifies the format of the token
            },
        },
    },
    security: [
        // {
        //     bearerAuth: [], // Apply the security scheme globally (optional)
        // },
    ],
    },
    apis: ['./app/routes/*'], // Path to the route file
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);


module.exports = {
    swaggerDocs
}

