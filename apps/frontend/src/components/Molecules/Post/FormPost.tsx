"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import { Button } from "../../Atoms/Button/Button";
import UploadButton from "../UploadImage/UploadButton";
function FormPost() {
  const [title, setTitle] = useState(""); // State to store the title input
  const [description, setDescription] = useState(""); // State to store the description input
  const [uploadedImageUrl, setUploadedImageUrl] = useState(""); // State to store the URL of the uploaded image
  const [showAttachment, setShowAttachment] = useState(true);
  // const {handleAddCard}=useContext(MyCardContext)
  // State to control the visibility of the attachment
  const handlePostClick = () => {
    // Handle post submission here
    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Uploaded Image URL:", uploadedImageUrl);

    // Reset form fields
    setTitle("");
    setDescription("");
    setUploadedImageUrl("");
    setShowAttachment(true); // Reset the attachment visibility
    // handleAddCard(title)
  };

  const handleAttachmentUpload = (imageUrl: string) => {
    // Set the uploaded image URL
    setUploadedImageUrl(imageUrl);
  };
  const handleAttachmentDelete = () => {
    // Clear the uploaded image URL
    setUploadedImageUrl("");
  };

  return (
    <div className="mt-[1%] max-md:w-[410px] items-center justify-center max-sm:w-[330px]">
      <div className="h-auto border-b-2 border-neutral-200">
        <p className="text-md">Create a Post</p>
      </div>
      <div>
        <select className="w-[180px] h-[30px] mt-[3%] max-sm:w-[120px] text-gray-600 text-[13px] border rounded-md border-gray-700 focus:outline-none focus:ring focus:ring-gray-700">
          <option value="" disabled selected className="text-gray-300">
            Choose Categories....
          </option>
          <option value="Mathematic">Mathematic</option>
          <option value="Physic">Physic</option>
          <option value="Khmer_Writing">Khmer Writing</option>
          <option value="Chemistry">Chemistry</option>
          <option value="Biology">Biology</option>
          <option value="History">History</option>
        </select>
      </div>
      <form>
        <div className="mt-[3%] border-t-2 border-gray-200 ">
          <div className="flex-row items-start justify-between -translate-x-1">
            {/* Title Input */}
            <div className="p-1">
              <input
                type="text"
                id="title"
                className="p-2 w-full md:w-[270px] text-sm text-black bg-gray-200 rounded-lg border border-gray-300 dark:text-white focus:outline-none"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            {/* Description Textarea */}
            <div className="p-1">
              <textarea
                id="Description"
                cols={5}
                className="p-2 w-full md:w-[270px] text-sm text-black bg-gray-200 rounded-lg border border-gray-300 dark:text-white focus:outline-none"
                placeholder="Description...."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            {/* Attachment Upload */}
            {showAttachment && (
              <div className="p-1 flex items-center justify-center">
                <UploadButton
                  onImageUpload={handleAttachmentUpload}
                  onImageDelete={handleAttachmentDelete}
                />
              </div>
            )}
          </div>
          {/* Display uploaded image if available */}
          {uploadedImageUrl && (
            <div className="w-[170] h-[125] flex items-center justify-center">
              <Image
                src={uploadedImageUrl}
                alt="Uploaded Image"
                width={170}
                height={125}
              />
            </div>
          )}
        </div>
      </form>
      <div className="flex items-end justify-end">
        <button
          className="flex items-center justify-center border w-[100px] h-[40px] rounded-lg bg-violet-700 hover:opacity-50"
          onClick={handlePostClick}
        >
          <p className="text-white">Post</p>
        </button>
      </div>
    </div>
  );
}

export default FormPost;

// "use client"

// import React, { useState } from "react";
// import Image from "next/image";
// import { Button } from "@/components/Atoms/Button/Button";
// import UploadButton from "../UploadImage/UploadButton";

// function FormPost() {
//   const [showTextarea, setShowTextarea] = useState(false);
//   const [uploadedImageUrl, setUploadedImageUrl] = useState(""); // State to store the URL of the uploaded image
//   const [showAttachment, setShowAttachment] = useState(true); // State to control the visibility of the attachment

//   const handlePostClick = () => {
//     setShowTextarea(true);
//     setShowAttachment(false); // Hide attachment when Post is clicked
//     setUploadedImageUrl(""); // Clear the uploaded image URL when switching to textarea
//   };

//   const handleAttachmentClick = () => {
//     setShowTextarea(false);
//     setShowAttachment(true); // Show attachment when Attachment is clicked
//   };

//   const handleImageUpload = (imageUrl: React.SetStateAction<string>) => {
//     setUploadedImageUrl(imageUrl); // Set the URL of the uploaded image
//   };

//   return (
//     <div className="mt-[10%] max-md:w-[410px] items-center justify-center max-sm:w-[320px]">
//       <div className="h-auto border-b-2 border-neutral-200">
//         <p className="text-md">Create a Post</p>
//       </div>
//       <div>
//         <select className="w-[180px] h-[30px] mt-[3%] max-sm:w-[120px] text-gray-500 text-[13px] border rounded-md border-gray-700 focus:outline-none focus:ring focus:ring-gray-700">
//           <option value="Choose">Choose Categories....</option>
//           <option value="Mathematic">Mathematic</option>
//           <option value="Physic">Physic</option>
//           <option value="Khmer_Writing">Khmer Writing</option>
//           <option value="Chemistry">Chemistry</option>
//           <option value="Biology">Biology</option>
//           <option value="History">History</option>
//         </select>
//       </div>
//       <div className="mt-[3%] border-t-2 border-gray-200">
//         <div className="flex items-start justify-between -translate-x-3">
//           {/* Post */}
//           <div className="p-3">
//             {showTextarea ? (
//               <textarea
//                 id="message"
//                 rows={5}
//                 className="p-2 w-full md:w-[453px] text-sm text-black bg-gray-50 rounded-lg border border-gray-300  dark:text-white focus:outline-none"
//                 placeholder="typing something..."
//               ></textarea>
//             ) : (
//               <button
//                 className="inline-flex gap-2"
//                 onClick={handlePostClick}
//               >
//                 <Image
//                   src="/post.svg"
//                   alt="post"
//                   width={24}
//                   height={24}
//                 />
//                 <p>Post</p>
//               </button>
//             )}
//           </div>
//           {/* Attachment */}
//           {showAttachment && (
//             <div className="p-3">
//               <UploadButton/>
//             </div>
//           )}
//           {/* Link */}
//           <div className="p-3">
//             <button
//               className="inline-flex gap-2"
//               onClick={handleAttachmentClick}
//             >
//               <Image
//                 src="/link.svg"
//                 alt="img"
//                 width={24}
//                 height={24}
//               />
//               <p>Link</p>
//             </button>
//           </div>
//         </div>
//         {/* Display uploaded image if available */}
//         {uploadedImageUrl && (
//           <div className="p-3 mt-[20%]">
//             <Image
//               src={uploadedImageUrl}
//               alt="uploaded"
//               width={100}
//               height={100}
//             />
//           </div>
//         )}
//       </div>
//       <div className="flex items-end justify-end">
//         <Button className="flex items-center justify-center border w-[100px] h-[40px] rounded-md bg-violet-700 hover:opacity-50">
//           <p className="text-white">Post</p>
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default FormPost;
