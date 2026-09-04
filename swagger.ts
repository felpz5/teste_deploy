import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CRUD Node.js + TypeScript + PostgreSQL",
      version: "1.0.0",
      description: "API simples de CRUD de produtos usando Express, TypeScript e PostgreSQL",
    },
    servers: [
      {
        url: "/api",
      },
    ],
  },
  apis: ["./routes/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
