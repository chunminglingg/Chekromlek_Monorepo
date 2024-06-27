import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios"

interface UploadProProps {
  onUpload: (uploadedFile: File | null) => void;
  username: string;
}
interface userDataTypes {
  _id: string;
  username: string;
  email: string;
  work: string;
  answers: number;
  posts: number;
  bio: string;
  gender: string;
  profile: string;
}

const UploadPro: React.FC<UploadProProps> = ({ onUpload , username }) => {

  const [userData, setUserData] = useState<userDataTypes | null>(null);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/v1/users/profile",
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response) {
        setUserData(response.data.user);
      }
    } catch (error: any) {
      if (error.response) {
        console.error("Error response:", error.response.data);
      } else if (error.request) {
        console.error("Error request:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      // Validate file size
      const maxSizeInBytes = 1 * 1024 * 1024; // 1 megabyte
      if (file.size > maxSizeInBytes) {
        alert('Maximum file size allowed is 1MB');
        return; // Stop further processing
      }
  
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      onUpload(file); // Pass the uploaded file to the parent component
    }
  };


  return (
    <div className="items-center justify-center border rounded-lg">
      <div className="flex justify-between m-5">
        <div className="flex items-center justify-center">
          <div className="relative rounded-full overflow-hidden w-14 h-14">
            {selectedImage ? (
              <Image
                src={selectedImage}
                alt="selected"
                width={50}
                height={55}
                className="object-cover w-full h-full rounded-full"
              />
            ) : (
              <Image
                src={"/imgs/profile.svg"}
                alt="account"
                width={50}
                height={50}
              />
            )}
          </div>
          <span className="text-center pl-2 font-medium">{username}</span>
        </div>
        <div className="flex h-[35px] items-center border rounded-xl p-2 mt-2 hover:bg-gray-200">
          <label htmlFor="upload-photo" className="cursor-pointer">
            <p className="text-[9px] items-start">Change Photo</p>
            <input
              type="file"
              id="upload-photo"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export { UploadPro };
