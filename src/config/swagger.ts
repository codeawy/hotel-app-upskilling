import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hotel Management API",
      version: "1.0.0",
      description: "API documentation with pagination",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}`,
      },
    ],
  },
  apis: [path.resolve(__dirname, "../routes/*.ts")],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
