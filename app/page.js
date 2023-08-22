"use client";
import React, { useEffect, useState } from "react";
import { getSocket } from "./socket";

export default function Home() {
  const socket = getSocket();
  const [id, setId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const joinRoom = (room) => {
    if (socket) {
      socket.emit("joinRoom", room);
    }
  };

  const myId = (data) => {
    setId(data.userId);
  };

  const sendMessage = () => {
    if (socket && text.trim() !== "") {
      const messageData = {
        text: text,
        room: "room",
      };
      socket.emit("message", messageData);
      setText(""); // Clear the input field
    }
  };

  useEffect(() => {
    joinRoom("room");
    const handleReceivedMessage = (data) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message: data.text,
          myMessage: data.user,
        },
      ]);
      // Handle the received message here, e.g., update state
    };

    socket.on("my-id", myId);
    socket.on("messageReceived", handleReceivedMessage);

    return () => {
      socket.off("messageReceived", handleReceivedMessage); // Remove only the specific listener
      socket.off("my-id"); // Remove only the specific listener
    };
  }, [socket]);

  return (
    <div className="bg-[#313338] h-screen">
      <div className="w-2/3  h-full mx-auto bg-[#2b2d31]">
        <div className=" flex flex-col h-full">
          <div className=" flex-1 h-full">
            <p className="text-white text-center my-10 text-xl">
              Your message will come here
            </p>

            <div className="flex flex-col p-6">
              {messages.map((msg, index) => (
                <div
                  className={`${
                    msg.myMessage == id
                      ? "py-4  flex justify-end"
                      : "py-4  flex justify-start"
                  }`}
                >
                  <span
                    className={`${
                      msg.myMessage == id
                        ? " bg-white w-fit px-4 py-2 rounded-md"
                        : "bg-blue-500 w-fit px-4 py-2 rounded-md text-white"
                    }`}
                    key={index}
                  >
                    {msg?.message}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-8 p-6">
            <input
              placeholder="type message here"
              className="flex-1 px-6 rounded-md"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              className="bg-[#15803d] text-white rounded-md py-2 px-4 font-medium w-fit"
              onClick={sendMessage}
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
