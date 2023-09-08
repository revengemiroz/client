"use client";

import React, { useState } from "react";

import Columns from "./Columns";

const COLUMNS = [
  {
    id: "todo",
    name: "TODO",
  },
  {
    id: "completed",
    name: "COMPLETED",
  },
];

const TASK = [
  {
    id: 1,
    columnId: "todo",
    content: "Task 1",
  },
  {
    id: 2,
    columnId: "todo",
    content: "Task 2",
  },
  {
    id: 3,
    columnId: "completed",
    content: "Task 3",
  },
];

function page() {
  const [columns, setColumns] = useState(COLUMNS);
  const [task, setTask] = useState(TASK);

  return (
    <div className="border border-red-200 h-screen gap-8 flex flex-row items-center justify-center">
      {columns?.map((column) => (
        <Columns column={column} task={TASK} />
      ))}
      <button
        className=""
        onClick={() =>
          setColumns([
            ...columns,
            {
              id: "new",
              name: "New",
            },
          ])
        }
      >
        Add columns
      </button>

      <button
        className=""
        onClick={() =>
          setTask([
            ...task,
            {
              id: 4,
              columnId: "completed",
              content: "Task 4",
            },
          ])
        }
      >
        Add columns
      </button>
    </div>
  );
}

export default page;
