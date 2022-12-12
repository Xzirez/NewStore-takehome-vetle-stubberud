import create from "zustand";
/* import { TodolClientImpl } from "../client/Client";
 */ import { CreateTodoBody, Todo, UpdateTodoBody } from "./Entities";

/* const client = newTodoClientImpl(
  "https://4wfk3e9c5e.execute-api.us-east-1.amazonaws.com"
); */

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
      const response: Todo[] = [
        {
          id: "123",
          name: "1",
          description: "hey",
          completed: false,
          createdAt: new Date(),
        },
        {
          id: "456",
          name: "2",
          description: "hey",
          completed: false,
          createdAt: new Date(),
        },
        {
          id: "lol",
          name: "3",
          description: "hey",
          completed: false,
          createdAt: new Date(),
        },
      ];
      set((state) => ({ ...state, todos: [...response], loading: false }));
    } catch (error: unknown) {
      set((state) => ({ ...state, error: error, loading: false }));
    }
  },
  updateTodo: async (body: UpdateTodoBody) => {
    try {
      set((state) => ({ ...state, loading: true }));

      set((state) => {
        state.todos.filter((todo) => {
          if (todo.id === body.id) {
            todo.completed = body.completed ?? todo.completed;
            todo.description = body.description ?? todo.description;
            todo.name = body.name ?? todo.name;
          }
        });
        return { ...state, todos: state.todos, loading: false };
      });
    } catch (error: unknown) {
      set((state) => ({ ...state, error: error, loading: false }));
    }
  },
  removeTodo: async (id: string) => {
    try {
      set((state) => ({ ...state, loading: true }));

      set((state) => {
        const index = state.todos.findIndex((todo) => todo.id === id);
        state.todos.splice(index, 1);
        return { ...state, todos: state.todos, loading: false };
      });
    } catch (error: unknown) {
      set((state) => ({ ...state, error: error, loading: false }));
    }
  },
  createTodo: async (body: CreateTodoBody) => {
    try {
      set((state) => ({ ...state, loading: true }));

      set((state) => {
        state.todos.push({
          id: "temp",
          completed: false,
          createdAt: new Date(),
          ...body,
        });
        return { ...state, todos: state.todos, loading: false };
      });
    } catch (error: unknown) {
      set((state) => ({ ...state, error: error, loading: false }));
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
