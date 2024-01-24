"use client";
import { useGlobalState } from "@/app/context/globalProvider";
import React from "react";
import styled from "styled-components";
import CreateContent from "../Modals/CreateContent";
import TaskItem from "../TaskItem/TaskItem";
import { add, plus } from "@/app/utils/Icons";
import Modal from "../Modals/Modal";

interface Props {
  title: string;
  tasks: any[];
}

function Tasks({ title, tasks }: Props) {
  const { theme, isLoading, openModal, modal } = useGlobalState();

  return (
    <TaskStyled theme={theme} className="relative p-8 w-full rounded-2xl h-full overflow-y-auto">
      {modal && <Modal content={<CreateContent />} />}
      <h1 className="relative font-bold ">{title}</h1>

      <button className="btn-rounded flex items-center justify-center fixed top-20 right-20 w-12 h-12 rounded-full text-lg" onClick={openModal}>
        {plus}
      </button>

      <div className="my-8 grid">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            title={task.title}
            description={task.description}
            date={task.date}
            isCompleted={task.isCompleted}
            id={task.id}
          />
        ))}
        <button className="create-task flex items-center justify-center gap-2 h-64 cursor-pointer font-normal rounded-2xl" onClick={openModal}>
          {add}
          Add New Task
        </button>
      </div>
    </TaskStyled>
  );
}

const TaskStyled = styled.main`
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  .btn-rounded {
    background-color: ${(props) => props.theme.colorBg};
    border: 2px solid ${(props) => props.theme.borderColor2};
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.3);
    color: ${(props) => props.theme.colorGrey2};
    @media screen and (max-width: 768px) {
      top: 3rem;
      right: 3.5rem;
    }
  }
  > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);

    &::after {
      content: "";
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 3rem;
      height: 0.2rem;
      background-color: ${(props) => props.theme.colorPrimaryGreen};
      border-radius: 0.5rem;
    }
  }

  .create-task {
   
    color: ${(props) => props.theme.colorGrey2};
   
    border: 3px dashed ${(props) => props.theme.colorGrey5};
    transition: all 0.3s ease;

    i {
      font-size: 1.5rem;
      margin-right: 0.2rem;
    }

    &:hover {
      background-color: ${(props) => props.theme.colorGrey5};
      color: ${(props) => props.theme.colorGrey0};
    }
  }
`;

export default Tasks;
