"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

import Modal from "@/components/Modal";
import Task from "@/components/Task";
import { queryClient } from "../providers";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function Todo() {
  let [isOpen, setIsOpen] = React.useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["getData"],
    queryFn: () =>
      axios
        .get("https://backend-4sah.onrender.com/todo")
        .then((res) => res.data),
  });

  const { mutate: deleteTask, isSuccess } = useMutation({
    queryKey: ["deleteTodo"],
    mutationFn: (id) =>
      axios
        .delete(`https://backend-4sah.onrender.com/todo/${id}`)
        .then((res) => res.data),
    onSuccess: (_, variables) => {
      const oldTodo = queryClient.getQueryData(["getData"]);
      const newTodo = oldTodo.filter((todo) => todo.id !== variables);
      queryClient.setQueriesData(["getData"], newTodo);
    },
  });

  const { mutate: updateTodo, isSuccess: updateTodoSuccess } = useMutation({
    queryKey: ["updateTodo"],
    mutationFn: (body) =>
      axios
        .patch(`https://backend-4sah.onrender.com/todo/${body.id}`, body)
        .then((res) => res.data),
    onSuccess: (data) => console.log({ data }),
  });

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className="w-full h-[100vh] bg-gray-900 pt-10 text-gray-300">
      <div className="container  m-auto  p-4 ">
        <div className="w-full flex justify-center">
          <button
            type="button"
            className=" rounded-md font-semibold w-full  max-w-[420px] px-4 py-2 text-white bg-primary hover:bg-primary/90 active:scale-105 ease-in-out duration-150"
            onClick={openModal}
          >
            Create Task
          </button>
        </div>

        <Modal isOpen={isOpen} setIsOpen={setIsOpen} />

        <div className="h-[80vh] overflow-auto no-scrollbar mt-8">
          {isLoading && (
            <div className="mx-auto mt-10">
              <ClipLoader
                color="#fffff"
                size={120}
                cssOverride={override}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          )}

          {!isLoading &&
            !error &&
            data?.map((task) => (
              <Task
                key={task.id}
                todo={task}
                deleteTask={deleteTask}
                updateTodo={updateTodo}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
