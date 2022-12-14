import { CreateTodoBody, Todo, UpdateTodoBody } from "./Entities";

enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  PUT = "PUT",
  DELETE = "DELETE",
}

interface TodoClient {
  getTodos(): Promise<Todo[]>;
  createTodo(todo: CreateTodoBody): Promise<Todo>;
  updateTodo(body: UpdateTodoBody): Promise<Todo>;
  deleteTodo(id: string): void;
}

class TodoClientImpl implements TodoClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  /**
   * Extracts a the contents of a network response. Throws an error if the
   * response wasn't successful.
   *
   * The error thrown will contain a specific message if an error type is
   * returned from the API or a default message.
   *
   * @param response - The Response object received from a fetch call
   * @return a promise that either resolves with the parsed json body or throws an error message
   */
  private async extractResponse<T>(response: Response): Promise<T> {
    const body = await response.json();

    if (!response.ok) {
      throw new Error("An error has occurred, please try again later");
    }

    return body;
  }

  private async fetch<T = Record<string, never>>(
    method: HttpMethod,
    url: string,
    body?: Record<string, unknown>
  ): Promise<T> {
    const response = await fetch(url, {
      method: method,
      headers: new Headers({
        Accept: "application/json",
      }),
      body: JSON.stringify(body),
    });
    const extractedResponse = await this.extractResponse<T>(response);
    return extractedResponse;
  }

  getTodos: TodoClient["getTodos"] = async () => {
    const resource = `${this.baseUrl}/todo`;
    const response = await this.fetch<Todo[]>(HttpMethod.GET, resource);
    return response;
  };

  createTodo: TodoClient["createTodo"] = async (body: CreateTodoBody) => {
    const resource = `${this.baseUrl}/createTodo`;
    const response = await this.fetch<Todo>(HttpMethod.POST, resource, {
      ...body,
    });
    return response;
  };
  updateTodo: TodoClient["updateTodo"] = async (body: UpdateTodoBody) => {
    const resource = `${this.baseUrl}/updateTodo`;
    const response = await this.fetch<Todo>(HttpMethod.PUT, resource, {
      ...body,
    });
    return response;
  };
  deleteTodo: TodoClient["deleteTodo"] = async (id: string) => {
    const resource = `${this.baseUrl}/deleteTodo?id=${id}`;
    await this.fetch<Todo>(HttpMethod.DELETE, resource);
  };
}

export { TodoClientImpl };
export type { TodoClient };
