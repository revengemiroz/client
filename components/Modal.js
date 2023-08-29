import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

import { useMutation, QueryClient } from "@tanstack/react-query";

export default function Modal({ isOpen, setIsOpen }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, isSuccess, isLoading } = useMutation({
    mutationKey: ["postTask"],
    mutationFn: (task) => {
      axios
        .post("https://backend-4sah.onrender.com/todo", task)
        .then((res) => res.data);
    },
  });

  const postTask = async (data) => {
    await mutate(data);
    if (!isLoading) {
      closeModal();
    }
  };

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10 " onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto ">
          <div className="flex min-h-full items-center justify-center p-4 text-center ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-800 p-6  text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg text-center font-medium leading-6 text-gray-300"
                >
                  Create Task
                </Dialog.Title>
                {/* <div className="border-b-2 w-full my-2 border-gray-500" /> */}
                <form className="mt-2" onSubmit={handleSubmit(postTask)}>
                  <div className="text-gray-400 flex flex-col gap-2">
                    <p>Title task</p>
                    <input
                      type="text"
                      placeholder="Task"
                      required
                      {...register("task")}
                      className="flex focus:outline-none focus:border-sky-400  focus:ring-0  text-gray-300 bg-gray-700 border-gray-600 h-10 w-full rounded-md border-2 border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground outline-none  disabled:cursor-not-allowed disabled:opacity-50 "
                    />
                  </div>

                  <div className="mt-6 text-gray-400 flex flex-col gap-2">
                    <p>Description</p>
                    <textarea
                      type="text"
                      placeholder="Description"
                      rows="3"
                      {...register("description")}
                      className="flex focus:outline-none focus:border-sky-400   focus:ring-0  text-gray-300 bg-gray-700 border-gray-600  w-full rounded-md border-2 border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground outline-none  disabled:cursor-not-allowed disabled:opacity-50 "
                    />
                  </div>

                  <div className="mt-4  flex justify-end gap-4 items-center">
                    <button
                      type="button"
                      className="rounded-md border-2 px-4 py-[6px] capitalize border-red-400 text-red-300 active:scale-105 ease-in-out duration-150 hover:bg-red-400/20"
                      onClick={closeModal}
                    >
                      cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md  px-4 py-2 text-white bg-primary hover:bg-primary/90 active:scale-105 ease-in-out duration-150"
                    >
                      Save Task
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
