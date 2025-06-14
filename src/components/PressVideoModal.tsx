import { useState } from 'react';

interface PressVideoModalProps {
  videoId: string;
  title: string;
  thumbnail: string;
}

export default function PressVideoModal({ videoId, title, thumbnail }: PressVideoModalProps) {
  const handleClick = () => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  return (
    <div 
      className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleClick}
    >
      <div className="relative pb-[56.25%] mb-4">
        <img 
          src={thumbnail} 
          alt={title}
          className="absolute top-0 left-0 w-full h-full object-cover rounded"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
            <i className="fas fa-play text-white text-2xl"></i>
          </div>
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
    </div>
  );
} 