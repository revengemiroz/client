"use client";

import { Box, TextField, Button } from "@radix-ui/themes";
import React from "react";

export default function Todo() {
  return (
    <div className="border flex items-center justify-center bg-[#313338] h-screen">
      <div className="border w-[500px]  flex flex-col gap-10">
        <p className="text-center text-white">TODO</p>
        <div className="flex gap-10">
          <TextField.Root className="flex-1 w-full">
            <TextField.Input placeholder="Add a Todo" />
          </TextField.Root>
          <Button className="w-fit">Add</Button>
        </div>

        <div className="border flex flex-col gap-10 text-white flex flex-col p-10 ">
          <p className="border text-center font-bold">List</p>

          <div className="flex flex-col gap-10 h-[200px] overflow-auto">
            <div className="border flex  items-center justify-between">
              <div className="flex gap-4">
                <span>1</span>
                <span className="text-[16px]">Get Juice</span>
              </div>
              <Button variant="classic" color="red" className=" w-fit">
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
