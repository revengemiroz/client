import React from "react";

function Columns({ column, task }) {
  const filteredTask = task?.filter((data) => data?.columnId == column.id);

  return (
    <div className="flex flex-col border-red h-2/4 w-80">
      <span className="border-red">{column.name}</span>

      <div className="flex flex-col border-red flex-1">
        {filteredTask?.map((card) => (
          <p>{card?.content}</p>
        ))}
      </div>
    </div>
  );
}

export default Columns;
