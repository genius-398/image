
import React, { useState, useCallback } from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface ImageUploaderProps {
  uploadedImage: File | null;
  setUploadedImage: (file: File | null) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ uploadedImage, setUploadedImage }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      setUploadedImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    handleFileChange(event.dataTransfer.files);
  }, []);

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const onRemoveImage = () => {
    setUploadedImage(null);
    if(preview) {
        URL.revokeObjectURL(preview);
        setPreview(null);
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Upload Image
      </label>
      {preview ? (
        <div className="relative group">
            <img src={preview} alt="Image preview" className="w-full h-auto max-h-60 object-contain rounded-lg"/>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                <button onClick={onRemoveImage} className="text-white bg-red-600 hover:bg-red-700 rounded-full p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
            </div>
        </div>
      ) : (
        <div 
          onDrop={onDrop}
          onDragOver={onDragOver}
          className="flex justify-center items-center w-full px-6 py-10 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg cursor-pointer hover:border-brand-primary dark:hover:border-brand-primary transition-colors duration-200 bg-gray-50 dark:bg-gray-800"
        >
          <div className="text-center">
            <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-brand-primary">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">PNG, JPG, WEBP up to 10MB</p>
            <input 
              id="file-upload" 
              name="file-upload" 
              type="file" 
              className="sr-only" 
              accept="image/png, image/jpeg, image/webp"
              onChange={(e) => handleFileChange(e.target.files)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
