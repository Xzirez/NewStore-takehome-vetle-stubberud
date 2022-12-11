import styled from "@emotion/styled";
import React, { useEffect } from "react";
import TodoCard from "../components/ProductCard";
import { useTodoStore } from "../Todo/Store";

/*
 1. Display current day
 2. Display progress
 3. Display starting weight
 4. Display Times a week

 Nice to have:
 - AI
 - Optional progress reports
*/

const Container = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  justify-content: center;
  align-items: center;
`;

const TodoPage = (): JSX.Element => {
  const { todos, getTodos } = useTodoStore();
  console.log(todos);

  useEffect(() => getTodos(), [getTodos]);
  return (
    <Container>
      {todos.map((todo, index) => (
        <TodoCard key={index} {...todo} />
      ))}
    </Container>
  );
};

export default TodoPage;
