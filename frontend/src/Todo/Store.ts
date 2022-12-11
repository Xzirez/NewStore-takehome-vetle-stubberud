import create from "zustand";
/* import { MineralClientImpl } from "../client/Client";
 */ import { Todo } from "./Entities";

/* const client = new MineralClientImpl(
  "https://4wfk3e9c5e.execute-api.us-east-1.amazonaws.com"
); */

interface TodoState {
  todos: Todo[];
  getTodos: () => void;
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
          id: "lol",
          name: "hello",
          description: "hey",
          completed: false,
          createdAt: new Date(),
        },
        {
          id: "lol",
          name: "hello",
          description: "hey",
          completed: false,
          createdAt: new Date(),
        },
        {
          id: "lol",
          name: "hello",
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
}));
