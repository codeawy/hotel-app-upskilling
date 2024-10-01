import swaggerJsdoc from "swagger-jsdoc";
import path from "path";
import YAML from "yamljs";

const swaggerDocument = YAML.load(path.join(__dirname, "../docs/openapi.yaml"));

const swaggerOptions = {
  definition: swaggerDocument,
  apis: [], // We don't need this anymore as we're using an external file
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
