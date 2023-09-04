import React, { useEffect, useState } from "react";

function Task({ todo, deleteTask, updateTodo, setIsEdit, setSelectedTodo }) {
  const { id, task, description, completed } = todo;

  return (
    <div className="relative w-full bg-gray-800 mb-8 rounded-md px-8 py-4 max-w-[720px] m-auto overflow-hidden">
      <div
        className={`${
          completed ? "bg-secondary_green" : "bg-secondary_red"
        } absolute w-2 h-full top-0 left-0 `}
      />
      <div className="flex flex-row gap-2">
        <div className=" flex w-full flex-col">
          <p className=" text-lg  font-semibold capitalize">{task}</p>
          <p className="text-gray-400 line-clamp-4">{description}</p>
        </div>
        <button
          onClick={() => {
            setIsEdit(true);
            setSelectedTodo(todo);
          }}
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 1024 1024"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 0 0 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 0 0 9.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"></path>
          </svg>
        </button>
      </div>

      <div className="flex justify-end gap-4">
        <button
          onClick={() => deleteTask(id)}
          className="rounded-md border-2 px-4 py-[6px] capitalize border-red-400 text-red-300 active:scale-105 ease-in-out duration-150 hover:bg-red-400/20"
        >
          Delete
        </button>

        <button
          className={`${
            completed
              ? "bg-secondary_green/70 hover:bg-secondary_green/90 disabled:bg-secondary_green/20 "
              : "bg-secondary_red/80 hover:bg-secondary_red/90 active:scale-105 "
          } rounded-md font-semibold px-4 py-2 text-white   ease-in-out duration-150 `}
          onClick={() => {
            const body = {
              id: id,
              completed: !completed,
            };
            updateTodo(body);
          }}
        >
          {completed ? "Completed" : "Complete"}
        </button>
      </div>
    </div>
  );
}

export default Task;
