import { number, string } from "joi";
import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Air Quality API Docs",
      version: "1.0.0",
    },
    servers:[{
        url: 'http://localhost:3000/',
        description: "Local server server"
    }],
    components: {
      schemas: {
        NearestCity: {
          type: "object",
          properties: {
            Resualt: {
              type: "object",
              properties: {
                pollution: {
                  type: "object",
                  properties: {
                    ts: { type: "string" },
                    aqius: { type: "number" },
                    mainus: { type: "string" },
                    aqicn: { type: "number" },
                    maincn: { type: "string" },
                  },
                },
              },
            },
          },
        },
        ParisMostPolluted: {
          type: "object",
          properties: {
            date: { type: "string" },
            time: { type: "string" },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts"], // adjust as needed
};

export const swaggerSpec = swaggerJSDoc(options);
