"use client";
import { useGlobalState } from "@/app/context/globalProvider";
import { edit, trash } from "@/app/utils/Icons";
import React from "react";
import styled from "styled-components";
import formatDate from "@/app/utils/formatDate";

interface Props {
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  id: string;
}

function TaskItem({ title, description, date, isCompleted, id }: Props) {
  const { theme, deleteTask, updateTask, openModal } = useGlobalState();
  return (
    <TaskItemStyled theme={theme} className="h-64 flex flex-col gap-1 rounded-2xl py-5 px-4" >
      <h1 className="text-2xl font-bold">{title}</h1>
      <p>{description}</p>
      <p className="date mt-auto">{formatDate(date)}</p>
      <div className="task-footer flex items-center gap-5 ">
        {isCompleted ? (
          <button
            className="completed border-none outline-none cursor-pointer inline-block rounded-full py-2 px-4"
            onClick={() => {
              const task = {
                id,
                isCompleted: !isCompleted,
              };

              updateTask(task);
            }}
          >
            Completed
          </button>
        ) : (
          <button
            className="incomplete border-none outline-none cursor-pointer inline-block rounded-full py-2 px-4"
            onClick={() => {
              const task = {
                id,
                isCompleted: !isCompleted,
              };

              updateTask(task);
            }}
          >
            Incomplete
          </button>
        )}
        <button className="ml-auto" onClick={openModal}>{edit}</button>
        <button
          className="delete"
          onClick={() => {
            deleteTask(id);
          }}
        >
          {trash}
        </button>
      </div>
    </TaskItemStyled>
  );
}

const TaskItemStyled = styled.div`
  background-color: ${(props) => props.theme.borderColor2};
  box-shadow: ${(props) => props.theme.shadow7};
  border: 2px solid ${(props) => props.theme.borderColor2};
  .task-footer {
      i {
        font-size: 1.4rem;
        color: ${(props) => props.theme.colorGrey2};
      }
    .incomplete {
      background: ${(props) => props.theme.colorDanger}; 
    }
    .completed {
      background: ${(props) => props.theme.colorGreenDark} !important;
    }
  }
`;

export default TaskItem;
