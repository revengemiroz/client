"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import toast from "react-hot-toast";

import Modal from "@/components/Modal";
import Task from "@/components/Task";
import { queryClient } from "../providers";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function Todo() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState({});

  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const closeModal = () => {
    setIsOpen(false);
    setIsEdit(false);
  };

  const notifySuccess = (msg) => toast.success(msg);
  const notifyError = (msg) => toast.error(msg);

  const { data, isLoading, error } = useQuery({
    queryKey: ["getData"],
    queryFn: () =>
      axios
        .get("https://backend-4sah.onrender.com/todo")
        .then((res) => res.data),
  });

  const { mutate: deleteTask, isSuccess } = useMutation({
    queryKey: ["deleteTodo"],
    mutationFn: async (id) => {
      try {
        const response = await axios.delete(
          `https://backend-4sah.onrender.com/todo/${id}`
        );
        return response.data;
      } catch (error) {
        throw new Error("Failed to delete task");
      }
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["getData"], (oldTodo) => {
        const newTodo = oldTodo.filter((todo) => todo.id !== variables);
        return newTodo;
      });
      notifySuccess("Successfully deleted");
    },
    onError: (error) => {
      notifyError(error.message);
    },
  });

  const { mutate: updateTodo, isSuccess: updateTodoSuccess } = useMutation({
    queryKey: ["updateTodo"],
    mutationFn: async (body) => {
      try {
        const response = await axios.patch(
          `https://backend-4sah.onrender.com/todo/${body.id}`,
          body
        );
        return response.data;
      } catch (error) {
        throw new Error("Failed to update the task");
      }
    },
    onSuccess: (updatedData, variables) => {
      queryClient.setQueryData(["getData"], (oldData) => {
        // Find and update the relevant data in your old data array
        const updatedIndex = oldData.findIndex(
          (data) => data.id === variables.id
        );
        if (updatedIndex !== -1) {
          oldData[updatedIndex] = updatedData;
        }
        notifySuccess("Sucessfully updated");
        setIsOpen(false);
        setIsEdit(false);
        return [...oldData]; // Return a new array with the updated data
      });
    },
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

        <Modal
          isOpen={isOpen || isEdit}
          setIsOpen={closeModal}
          notifySuccess={notifySuccess}
          isEdit={isEdit}
          selectedTodo={selectedTodo}
          updateTodo={updateTodo}
        />

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
                setIsEdit={setIsEdit}
                setSelectedTodo={setSelectedTodo}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
