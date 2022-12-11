export interface Todo {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  completed: boolean;
}

export interface UpdateTodoBody {
  id: string;
  name?: string;
  description?: string;
  completed?: boolean;
}

