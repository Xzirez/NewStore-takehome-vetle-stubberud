import create from "zustand";
import { TodoClientImpl } from "./Client";
import { CreateTodoBody, Todo, UpdateTodoBody } from "./Entities";

const client = new TodoClientImpl(
  "https://966stdpxd1.execute-api.us-east-1.amazonaws.com"
);

interface TodoState {
  todos: Todo[];
  getTodos: () => void;
  updateTodo: (newTodo: UpdateTodoBody) => void;
  removeTodo: (id: string) => void;
  createTodo: (body: CreateTodoBody) => void;
  prioritizeTodo: (id: string) => void;
  loading?: boolean | null;
  error?: string | null | unknown;
}

export const TodoSelector = (id: string): Todo | undefined =>
  useTodoStore((state) => state.todos.find((todo) => todo.id === id));

export const useTodoStore = create<TodoState>((set) => ({
  todos: [],
  error: null,
  loading: null,
  getTodos: async () => {
    try {
      set((state) => ({ ...state, loading: true }));
      const response: Todo[] = await client.getTodos();
      set((state) => ({
        ...state,
        todos: [...response],
        loading: false,
      }));
    } catch (error: unknown) {
      set((state) => ({ ...state, error: error, loading: false }));
    }
  },
  updateTodo: async (body: UpdateTodoBody) => {
    let cachedItem: Todo | undefined;
    let cachedTodos: Todo[] | undefined;
    try {
      set((state) => ({ ...state, loading: true }));
      set((state) => {
        cachedTodos = state.todos;
        state.todos.map((todo) => {
          if (todo.id === body.id) {
            cachedItem = todo;
            console.log(cachedItem);
            todo.completed = body.completed ?? todo.completed;
            todo.description = body.description ?? todo.description;
            todo.name = body.name ?? todo.name;
          }
        });
        return { ...state };
      });
      await client.updateTodo({ ...cachedTodos, ...body });
      set((state) => ({ ...state, loading: false }));
    } catch (error: unknown) {
      set((state) => {
        if (cachedItem) {
          state.todos.map((todo) => {
            if (todo.id === body.id && cachedItem) {
              todo.completed = cachedItem.completed;
              todo.description = cachedItem.description;
              todo.name = cachedItem.name;
            }
          });
        }
        return { ...state, todos: state.todos, loading: false };
      });
    }
  },
  removeTodo: async (id: string) => {
    let cachedItem: Todo | undefined;
    let index;
    try {
      set((state) => ({ ...state, loading: true }));

      set((state) => {
        index = state.todos.findIndex((todo) => todo.id === id);
        cachedItem = state.todos.find((todo) => todo.id === id);
        state.todos.splice(index, 1);
        return { ...state, todos: state.todos };
      });

      await client.deleteTodo(id);
    } catch (error: unknown) {
      set((state) => {
        if (cachedItem) {
          state.todos.push(cachedItem);
        }
        return { ...state, error: error, loading: false };
      });
    }
  },
  createTodo: async (body: CreateTodoBody) => {
    try {
      set((state) => ({ ...state, loading: true }));

      set((state) => {
        state.todos.push({
          id: "temp",
          ...body,
        });
        return { ...state, todos: state.todos };
      });
      const newTodo = await client.createTodo(body);

      set((state) => {
        const tempIndex = state.todos.findIndex((todo) => todo.id === "temp");
        state.todos[tempIndex] = newTodo;
        return { ...state, todos: state.todos, loading: false };
      });
    } catch (error: unknown) {
      set((state) => {
        const tempIndex = state.todos.findIndex((todo) => todo.id === "temp");
        state.todos.splice(tempIndex, 1);
        return { ...state, todos: state.todos, loading: false };
      });
    }
  },
  prioritizeTodo: (id: string) => {
    set((state) => {
      state.todos.sort((a) => {
        if (a.id === id) {
          return -1;
        } else {
          return 1;
        }
      });
      return { ...state };
    });
  },
}));
