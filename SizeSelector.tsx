
import React from 'react';
import { ImageSizeOption } from '../types';
import { IMAGE_SIZE_OPTIONS } from '../constants';

interface SizeSelectorProps {
  selectedSize: ImageSizeOption;
  setSelectedSize: (size: ImageSizeOption) => void;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({ selectedSize, setSelectedSize }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = IMAGE_SIZE_OPTIONS.find(option => option.value === event.target.value);
    if (newSize) {
      setSelectedSize(newSize);
    }
  };

  return (
    <div>
      <label htmlFor="size" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Image Size
      </label>
      <select
        id="size"
        name="size"
        value={selectedSize.value}
        onChange={handleChange}
        className="w-full p-3 bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-200 ease-in-out text-light-text dark:text-dark-text"
      >
        {IMAGE_SIZE_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
