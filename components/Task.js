import React from "react";

function Task({ todo, deleteTask, updateTodo }) {
  const { id, task, description, completed } = todo;

  return (
    <div className="relative w-full bg-gray-800 mb-8 rounded-md px-8 py-4 max-w-[720px] m-auto overflow-hidden">
      <div
        className={`${
          completed ? "bg-secondary_green" : "bg-secondary_red"
        } absolute w-2 h-full top-0 left-0 `}
      />
      <div className="flex flex-col gap-2">
        <p className=" text-lg font-semibold capitalize">{task}</p>
        <p className="text-gray-400 line-clamp-4">{description}</p>
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
