import React, { SetStateAction, useState } from "react";
import Image from "next/image";

interface UploadProProps {
  onUpload: (uploadedFile: SetStateAction<null>) => void;
 
}
const UploadPro: React.FC<UploadProProps> = ({ onUpload } ) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]; // Get the selected file
    if (file) {
      // Check if a file is selected
      const imageUrl = URL.createObjectURL(file); // Create a URL for the selected image
      setSelectedImage(imageUrl); // Set the selected image URL in state
    }
  };
  return (
    <div className="items-center justify-center border rounded-lg">
      <div className="flex justify-between m-5">
        <div className="flex items-center justify-center">
          <div className="relative rounded-full overflow-hidden w-14 h-14 ">
            {selectedImage ? ( // Render selected image if available
              <Image
                src={selectedImage}
                alt="selected"
                width={50}
                height={55}
                className=" object-cover w-full h-full"
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
          <span className="text-center pl-2 font-medium"> Kimlang Tieng</span>
        </div>
        <div className="flex h-[35px] items-center  border rounded-xl p-2 mt-2 hover:bg-gray-200">
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
