import express, { type Request, type Response } from "express";
import type {
  Todo,
  CreateTodoRequest,
  UpdateTodoRequest,
  ApiSucessResponse,
  Params,
} from "@shared/types";
import { ApiError } from "../../utils/utils.js";
import { prisma } from "../../lib/prisma.js";

const router = express.Router();

/**
 * @swagger
 * /todos:
 *  get:
 *    summary: Retrieve a list of v1 todos
 *    tags: [Todos v1]
 *    responses:
 *      200:
 *        $ref: "#/components/responses/GetArrayOfTodos"
 *      500:
 *        $ref: "#/components/responses/InternalServerError"
 */
router.get("/todos", async (_req, res: Response<ApiSucessResponse<Todo[]>>) => {
  const data = await prisma.todo.findMany({
    orderBy: { createdAt: "desc" },
  });
  return res.status(200).json({ success: true, data });
});

/**
 * @swagger
 * /todos:
 *  post:
 *    summary: Create a new v1 todo
 *    tags: [Todos v1]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - title
 *            properties:
 *              title:
 *                type: string
 *                example: "Buy groceries"
 *    responses:
 *      201:
 *        $ref: "#/components/responses/GetSingleTodo"
 *      500:
 *        $ref: "#/components/responses/InternalServerError"
 */
router.post(
  "/todos",
  async (
    req: Request<CreateTodoRequest>,
    res: Response<ApiSucessResponse<Todo>>,
  ) => {
    const { title } = req.body;

    const newTodo = await prisma.todo.create({
      data: {
        title,
      },
    });

    return res.status(201).json({ success: true, data: newTodo });
  },
);

/**
 * @swagger
 * /todos/{id}:
 *  patch:
 *    summary: Update a part of a v1 todo
 *    tags: [Todos v1]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *             title:
 *                type: string
 *                example: "Buy groceries and cook dinner"
 *             isCompleted:
 *               type: boolean
 *    responses:
 *      200:
 *        $ref: "#/components/responses/GetSingleTodo"
 *      404:
 *        $ref: "#/components/responses/NotFoundTodo"
 *      500:
 *        $ref: "#/components/responses/InternalServerError"
 */
router.patch(
  "/todos/:id",
  async (
    req: Request<Params, {}, UpdateTodoRequest>,
    res: Response<ApiSucessResponse<Todo>>,
  ) => {
    const { id } = req.params;
    const { title, isCompleted } = req.body;

    let data = await prisma.todo.findUnique({
      where: { id },
    });

    if (!data) {
      throw new ApiError(404, "Todo is not found");
    }

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: {
        title: title ?? data.title,
        isCompleted: isCompleted ?? data.isCompleted,
      },
    });

    return res.status(200).json({ success: true, data: updatedTodo });
  },
);

/**
 * @swagger
 * /todos/{id}:
 *  delete:
 *    summary: Delete a v1 todo
 *    tags: [Todos v1]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      204:
 *        $ref: "#/components/responses/NoContent"
 *      404:
 *        $ref: "#/components/responses/NotFoundTodo"
 *      500:
 *        $ref: "#/components/responses/InternalServerError"
 */
router.delete(
  "/todos/:id",
  async (req: Request<Params>, res: Response<ApiSucessResponse<null>>) => {
    const { id } = req.params;

    const data = await prisma.todo.findUnique({
      where: { id },
    });

    if (!data) {
      throw new ApiError(404, "Todo is not found");
    }

    await prisma.todo.delete({
      where: { id },
    });

    return res.status(204).json({ success: true, data: null });
  },
);

export default router;
