"use client";

import React, { useState, useRef } from "react";
import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { queryClient } from "../providers";

function Home() {
  const [handleImage, setHandleImage] = useState();
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const inputRef = useRef(null);

  // const queryClient = new QueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["getData"],
    queryFn: () =>
      axios
        .get("https://backend-4sah.onrender.com/user")
        .then((res) => res.data),
  });

  const { mutateAsync, isError } = useMutation({
    mutationKey: ["postImage"],
    mutationFn: (image) => {
      return axios.post(
        "https://backend-4sah.onrender.com/cloudinary/upload",
        image
      );
    },
  });

  const { mutate, isSuccess } = useMutation({
    mutationKey: ["postUser"],
    mutationFn: (user) => {
      console.log("what is user", user);
      return axios.post("https://backend-4sah.onrender.com/user", user);
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ["getData"],
      });
    },
  });

  const upload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await mutateAsync(formData);
      const data = response.data; // Assuming response.data contains the data you need
      console.log("Response data:", data);
      return data;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const uploadUser = async () => {
    const imageUrl = await upload(handleImage);
    console.log({ imageUrl });
    try {
      const user = {
        name: name,
        email: email,
        image: imageUrl?.url,
      };
      console.log("what is formdata", JSON.stringify(user));
      const response = await mutate(user);
      const data = response?.data; // Assuming response.data contains the data you need
      console.log("Response data:", data);
    } catch (error) {
      console.error("Error uploading user", error);
    }
  };

  return (
    <div className="bg-[#313338] h-screen flex items-center justify-center ">
      <div className="border flex flex-col gap-6 p-20 rounded-md">
        <div
          className="avatar-container flex justify-center "
          onClick={() => {
            inputRef?.current.click();
          }}
        >
          {image ? (
            <div className="border bg-white rounded-full overflow-hidden flex items-center justify-center mt-10">
              <img
                src={image}
                style={{
                  maxWidth: "100%",
                  maxHeight: "150px",
                  width: "auto",
                  height: "auto",
                }}
              />
            </div>
          ) : (
            <div className="avatar w-40 border h-40 rounded-full flex items-center justify-center text-white">
              Avatar
            </div>
          )}
        </div>
        <input
          type="file"
          ref={inputRef}
          style={{ display: "none" }}
          onChange={(e) => {
            setHandleImage(e.target.files[0]);
            const imageURL = URL.createObjectURL(e.target.files[0]);
            setImage(imageURL);
          }}
        />

        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <label className="text-white">Name</label>
            <input onChange={(e) => setName(e.target.value)} />

            <div className="flex gap-6">
              <label className="text-white">Email</label>
              <input onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          {/* <button
            className=""
            onClick={() =>
              queryClient.invalidateQueries({
                queryKey: ["getData"],
              })
            }
          >
            Post
          </button> */}
          <button
            className="px-2 py-3 bg-[#40444c] text-white rounded-md"
            onClick={() => uploadUser()}
          >
            Upload User
          </button>
        </div>

        <div className="flex flex-col gap-4 mt-10 max-h-[400px] overflow-auto">
          {data?.map((a) => (
            <div className="flex flex-row gap-4 text-white ">
              <div className="bg-white rounded-full border overflow-hidden">
                <img
                  src={a.image}
                  className="img-fluid rounded-circle"
                  style={{
                    maxWidth: "50px",
                    maxHeight: "50px",
                    width: "auto",
                    height: "auto",
                  }}
                  alt="User"
                />
              </div>

              <div className="flex flex-col">
                <span className="text-[#ced1d5] font-medium">{a.name}</span>
                <span className="text-[#a7acb4] text-sm">{a.email}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
