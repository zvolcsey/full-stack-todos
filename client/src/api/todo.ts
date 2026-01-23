import axiosInstance from "./axiosInstance";
import {
  type ApiSucessResponse,
  type CreateTodoRequest,
  type Todo,
  type UpdateTodoRequest,
} from "@shared/types";

async function getTodos(): Promise<Todo[]> {
  const response = await axiosInstance.get<ApiSucessResponse<Todo[]>>("/todos");
  return response.data.data;
}

async function createTodo(body: CreateTodoRequest): Promise<Todo> {
  const response = await axiosInstance.post<ApiSucessResponse<Todo>>(
    "/todos",
    body,
  );
  return response.data.data;
}

async function patchTodo(id: string, body: UpdateTodoRequest): Promise<Todo> {
  const response = await axiosInstance.patch<ApiSucessResponse<Todo>>(
    `/todos/${id}`,
    body,
  );
  return response.data.data;
}

async function deleteTodo(id: string): Promise<null> {
  const response = await axiosInstance.delete<ApiSucessResponse<null>>(
    `/todos/${id}`,
  );
  return response.data.data;
}

export default { getTodos, createTodo, patchTodo, deleteTodo };
