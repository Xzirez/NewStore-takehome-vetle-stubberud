import styled from "@emotion/styled";
import React from "react";
import { Todo } from "../Todo/Entities";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  height: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  margin: 10px;
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const CardImage = styled.img`
  width: 100%;
  max-width: 200px;
  margin-bottom: 16px;
  border-radius: 4px 4px 0 0;
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
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
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
}: Todo): JSX.Element => (
  <CardContainer>
    <CardImage src={""} alt={""} />
    <CardTitle>{name}</CardTitle>
    <CardDescription>{description}</CardDescription>
    <CardPrice>{createdAt.toLocaleString()}</CardPrice>
    <CardPrice>Completed: {completed ? "Yes" : "No"}</CardPrice>
    <Button>Complete Task</Button>
  </CardContainer>
);

export default TodoCard;
