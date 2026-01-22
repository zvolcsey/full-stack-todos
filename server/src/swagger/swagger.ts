import type { Application } from "express";
import swaggerJsdocs from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const v1Options: swaggerJsdocs.Options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Todos API",
      version: "1.0.0",
      description:
        "This is the server side of a todo app built with Node.js and Express.",
      contact: {
        name: "Zoltán Völcsey",
        email: "zvolcsey@gmail.com",
      },
      license: {
        name: "MIT",
        url: "https://opensource.org/license/mit/",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "v1 Development server",
      },
    ],
    components: {
      schemas: {
        SingleTodo: {
          type: "object",
          required: ["title"],
          properties: {
            id: {
              type: "string",
              format: "uuid",
              readOnly: true,
              example: "550e8400-e29b-41d4-a716-446655440000",
            },
            title: { type: "string", example: "Buy groceries" },
            isCompleted: { type: "boolean", default: false, example: false },
            createdAt: {
              type: "string",
              format: "date-time",
              readOnly: true,
              example: "2023-10-01T12:00:00Z",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              readOnly: true,
              example: "2023-10-01T12:00:00Z",
            },
          },
        },
        SuccessResponseArrayOfTodos: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            data: {
              type: "array",
              items: {
                $ref: "#/components/schemas/SingleTodo",
              },
            },
          },
        },
        SuccessResponseSingleTodo: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            data: { $ref: "#/components/schemas/SingleTodo" },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            error: {
              type: "object",
              properties: {
                status: { type: "integer", example: 404 },
                message: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        GetArrayOfTodos: {
          description: "List of todos retrieved successfully.",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/SuccessResponseArrayOfTodos",
              },
            },
          },
        },
        GetSingleTodo: {
          description: "A single todo item.",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/SuccessResponseSingleTodo",
              },
            },
          },
        },
        NoContent: {
          description: "No Content",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/SuccessResponse",
              },
              example: {
                success: true,
                data: null,
              },
            },
          },
        },
        NotFoundTodo: {
          description: "The todo with the specified ID was not found.",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
              example: {
                success: false,
                error: {
                  status: 404,
                  message: "The todo with the specified ID was not found.",
                },
              },
            },
          },
        },
        InternalServerError: {
          description: "Internal Server Error",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorResponse",
              },
              example: {
                success: false,
                error: {
                  status: 500,
                  message: "Internal Server Error",
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/v1/*.ts"],
};

const v1SwaggerSpec = swaggerJsdocs(v1Options);

export const setupSwagger = (app: Application) => {
  app.use("/api-docs/v1", swaggerUi.serve, swaggerUi.setup(v1SwaggerSpec));
};
