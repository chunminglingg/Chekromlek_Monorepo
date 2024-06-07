import React, { useState, ChangeEvent } from 'react';
import Image from 'next/image';
import { Button } from '@/components/Atoms/Button/Button';

type UploadButtonProps = {
  onImageUpload: (imageUrl: string) => void;
  onImageDelete: () => void;
};

const UploadButton: React.FC<UploadButtonProps> = ({ onImageUpload, onImageDelete }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      // Validate file size
    const maxSizeInBytes = 1 * 1024 * 1024; // 1 megabyte
    if (file.size > maxSizeInBytes) {
      alert('Maximum file size allowed is 1MB');
      return; // Stop further processing
    }
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
      setSelectedFileName(file.name);
      onImageUpload(URL.createObjectURL(file)); // Trigger the upload callback
    }
  };
  

  const handleDelete = () => {
    setSelectedFile(null);
    setPreviewImage(null);
    setSelectedFileName("");
    onImageDelete();
  };

  return (
    <div className="upload-button flex flex-col items-center gap-2">
      <label htmlFor="fileUpload" className="flex-row items-center gap-2 cursor-pointer">
        {previewImage ? (
          <div className="relative">
            <Image
              src={previewImage}
              alt="Preview"
              width={350}
              height={180}
              className="h-[230px] w-auto relative items-center justify-center rounded-md"
            />
            <button
              onClick={handleDelete}
              className="absolute top-2 right-2 bg-red-400 text-white rounded-full p-2"
              aria-label="Delete image"
            >
              <Image src={"/icons/cancel.svg"} width={14} height={14} alt='delete image' />
            </button>
          </div>
        ) : (
          <Image
            src="/img.svg"
            alt="img"
            width={24}
            height={24}
            className="ms-[38%] flex items-center justify-center rounded-md"
          />
        )}
        <p className="flex items-center justify-center">Attachment</p>
      </label>
      <input id="fileUpload" type="file" onChange={handleFileChange} className="hidden" />
    </div>
  );
};

export default UploadButton;
