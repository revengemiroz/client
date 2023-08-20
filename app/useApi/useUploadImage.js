import { useMutation } from "@tanstack/react-query";

export const useUploadImage = () => {
  const [uploadImage] = useMutation(
    "https://tricky-boot-fox.cyclic.cloud/cloudinary/upload"
  );
};
