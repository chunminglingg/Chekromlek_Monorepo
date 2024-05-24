// import React, { useState, ChangeEvent } from 'react';
// import Image from 'next/image';

// function UploadButton() {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);

//   const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       setSelectedFile(event.target.files[0]);
//     }
//   };

//   const handleUpload = () => {
//     if (selectedFile) {
//       const formData = new FormData();
//       formData.append('file', selectedFile);

//       fetch('/upload', {
//         method: 'POST',
//         body: formData
//       })
//       .then(response => {
//         if (response.ok) {
//           console.log('File uploaded successfully');
//         } else {
//           console.error('Error uploading file');
//         }
//       })
//       .catch(error => {
//         console.error('Error uploading file:', error);
//       });
//     } else {
//       console.error('No file selected');
//     }
//   };

//   return (
//     <div>
//     <label htmlFor="fileUpload" className="inline-flex items-center gap-2 cursor-pointer">
//     <Image src="/img.svg" alt="img" width={24} height={24} />
//               <p>Attachement</p>
//     </label>
//     <input id="fileUpload" type="file" onChange={handleFileChange} className="hidden" />
//     <button onClick={handleUpload}></button>
//   </div>
//   );
// }
// export default UploadButton;
//========================================================================================


import React, { useState, ChangeEvent } from 'react';
import Image from 'next/image';

function UploadButton({ onImageUpload }: { onImageUpload: (imageUrl: string) => void }) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file)); // Create preview URL
      setSelectedFileName(file.name);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      fetch('/upload', {
        method: 'POST',
        body: formData
      })
      .then(response => {
        if (response.ok) {
          console.log('File uploaded successfully');
          // If upload is successful, pass the uploaded image URL back to the parent component
          onImageUpload(URL.createObjectURL(selectedFile));
        } else {
          console.error('Error uploading file');
        }
      })
      .catch(error => {
        console.error('Error uploading file:', error);
      });
    } else {
      console.error('No file selected');
    }
  };

  return (
    <div className= ' '>
      <label htmlFor="fileUpload" className="flex-row items-center gap-2 cursor-pointer">
        {previewImage ? (
          <Image src={previewImage} alt="Preview" width={ 350} height={180} className=' h-[150px] relative items-center justify-center rounded-md ' />
        ) : (
          <Image src="/img.svg" alt="img" width={24} height={24} className=' ms-[38%] flex items-center justify-center rounded-md ' />
        )}
        <p className=' flex items-center justify-center'>{selectedFileName || "Attachement"}</p>
        {/* <p>Attachment</p> */}
      </label>

      <input id="fileUpload" type="file" onChange={handleFileChange} className="hidden" />
      <button onClick={handleUpload}></button>
    </div>
  );
}

export default UploadButton;

