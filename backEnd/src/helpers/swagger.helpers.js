import swaggerJSDoc from "swagger-jsdoc";
import __dirname from "../../utils.js";

const opts = {
  definition: {
    openapi: "3.1.0", //la ultima version
    info: {
      title: "E-commerce API",
      description: "API documentation for the E-commerce application",
    }
  },
  apis: [__dirname+"/src/docs/*.yaml"],
}
const swaggerSpec = swaggerJSDoc(opts);

export default swaggerSpec;
