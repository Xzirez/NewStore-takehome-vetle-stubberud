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

export interface CreateTodoBody {
  name: string;
  description: string;
}

