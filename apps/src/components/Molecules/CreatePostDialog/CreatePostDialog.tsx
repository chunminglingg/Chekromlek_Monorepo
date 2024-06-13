"use client";
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { SelectScrollable } from '../Selection/Selection';
import { HeaderPost } from '../AfterPostHeader';
import UploadButton from '@/components/Molecules/UploadImage/UploadButton';


interface CreatePostDialogProps {
  onTitleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit?: () => void;
  onImageUpload?: (imageUrl: string) => void;
  onImageDelete?: () => void;
  onDialogOpen?: () => void;
  onDialogClose?: () => void;
}

const CreatePostDialog: React.FC<CreatePostDialogProps> = ({
  onTitleChange,
  onDescriptionChange,
  onSubmit,
  onImageUpload,
  onImageDelete,
  onDialogOpen,
  onDialogClose,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust time as necessary

    return () => clearTimeout(timer);
  }, []);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    onTitleChange?.(e);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    onDescriptionChange?.(e);
  };

  const handleSubmit = () => {
    console.log('Selected Category:', selectedCategory);
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('Uploaded Image URL:', uploadedImageUrl);
    onSubmit?.();
    setSelectedCategory('');
    setTitle('');
    setDescription('');
    setUploadedImageUrl('');
    onDialogClose
  };

  const handleAttachmentUpload = (imageUrl: string) => {
    setUploadedImageUrl(imageUrl);
    onImageUpload?.(imageUrl);
  };

  const handleAttachmentDelete = () => {
    setUploadedImageUrl('');
    onImageDelete?.();
  };

  const openDialog = () => {
    setIsOpen(true);
    onDialogOpen?.();
  };

  const closeDialog = () => {
    setIsOpen(false);
    onDialogClose?.();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => open ? openDialog() : closeDialog()}>
        <DialogTrigger asChild>
          <button onClick={openDialog}><HeaderPost/></button>
        </DialogTrigger>
        <DialogContent className="w-[645px] max-sm:w-[90%] max-sm:rounded-md">
            <DialogHeader className="flex flex-col gap-2">
              <DialogTitle>Create a Post</DialogTitle>
              <DialogDescription className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  Simplify Your Sharing Experience!
                  <SelectScrollable onValueChange={handleCategoryChange} />
                </div>
                <div className="flex flex-col gap-4 pt-6 focus:outline-none">
                  <input
                    placeholder="Title"
                    value={title}
                    onChange={handleTitleChange}
                    aria-label="title"
                    className="focus:outline-none border rounded-md h-[40px] p-1"
                  />
                  <textarea
                    placeholder="Type your descriptions of your question here."
                    value={description}
                    onChange={handleDescriptionChange}
                    aria-label="description"
                    className="focus:outline-none border rounded-md h-[80px] p-1"
                  />
                  <div className="w-full h-[250px] border rounded-md justify-center items-center grid gap-1.5">
                    <UploadButton
                      onImageUpload={handleAttachmentUpload}
                      onImageDelete={handleAttachmentDelete}
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleSubmit}
                    className="px-8 py-2 bg-[#7B2CBF] hover:opacity-[70%] text-white rounded-md"
                  >
                    Post
                  </button>
                </div>
              </DialogDescription>
            </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreatePostDialog;
