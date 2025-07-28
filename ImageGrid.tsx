
import React from 'react';
import { DownloadIcon } from './icons/DownloadIcon';

interface ImageGridProps {
  images: string[];
}

export const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
  const handleDownload = (base64Image: string, index: number) => {
    const link = document.createElement('a');
    link.href = base64Image;
    link.download = `vibegen-ai-image-${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
      {images.map((image, index) => (
        <div key={index} className="relative group overflow-hidden rounded-xl shadow-lg">
          <img src={image} alt={`Generated artwork ${index + 1}`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => handleDownload(image, index)}
              className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white font-semibold py-2 px-4 rounded-lg hover:bg-white/30 transition-colors"
            >
              <DownloadIcon className="h-5 w-5" />
              <span>Download</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
