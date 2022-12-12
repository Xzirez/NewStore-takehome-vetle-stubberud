import styled from "@emotion/styled";
import React, { useEffect } from "react";
import TodoCard from "../components/TodoCard";
import { useTodoStore } from "../Todo/Store";

const Container = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  justify-content: center;
  align-items: center;
`;

const TodoPage = (): JSX.Element => {
  const { todos, getTodos, createTodo } = useTodoStore();
  useEffect(() => getTodos(), [getTodos]);
  return (
    <Container>
      <button
        onClick={() =>
          createTodo({ name: "newTodo", description: "I am a new todo" })
        }
      >
        Create New Todo
      </button>
      {todos.map((todo, index) => (
        <TodoCard key={index} {...todo} />
      ))}
    </Container>
  );
};

export default TodoPage;
