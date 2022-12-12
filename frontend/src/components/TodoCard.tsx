import styled from "@emotion/styled";
import React from "react";
import { Todo } from "../Todo/Entities";
import { useTodoStore } from "../Todo/Store";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  height: 300px;
  width: 150px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  margin: 10px;
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.2);
  position: relative;
`;
const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.25em;
  font-weight: normal;
  text-align: left;
  color: #333;
`;

const CardPrice = styled.p`
  margin: 0;
  font-size: 0.9em;
  text-align: left;
  color: #555;
`;

const CardDescription = styled.p`
  margin: 0;
  font-size: 1em;
  font-weight: bold;
  text-align: left;
  color: #333;
`;

const Button = styled.button`
  height: 50px;
  width: 90px;
  margin: 10px;
  padding: 8px 16px;
  border: 1px solid #000;
  border-radius: 4px;
  background-color: transparent;
  color: #000;
  font-size: 0.9em;
  cursor: pointer;
`;

const TodoCard = ({
  name,
  description,
  completed,
  createdAt,
  id,
}: Todo): JSX.Element => {
  const { updateTodo, removeTodo, prioritizeTodo } = useTodoStore();
  return (
    <CardContainer>
      <CardTitle>{name}</CardTitle>
      <CardDescription>{description}</CardDescription>
      <CardPrice>{createdAt.toLocaleString()}</CardPrice>
      <CardPrice>Completed: {completed ? "Yes" : "No"}</CardPrice>
      {completed ? (
        <Button onClick={() => updateTodo({ id, completed: false })}>
          Undo
        </Button>
      ) : (
        <Button onClick={() => updateTodo({ id, completed: true })}>
          Complete Task
        </Button>
      )}
      <Button onClick={() => removeTodo(id)}>Remove Task</Button>
      <Button onClick={() => prioritizeTodo(id)}>Prioritize</Button>
    </CardContainer>
  );
};

export default TodoCard;
