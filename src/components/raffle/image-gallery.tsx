'use client';

import { useState } from 'react';
import { RaffleImage } from '@/types/raffle';
import Image from 'next/image';

interface ImageGalleryProps {
  images: RaffleImage[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const mainImage = images.find(img => !img.isThumbnail) || images[0];
  const thumbnails = images.filter(img => img.isThumbnail);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-[#1A1A1A]">
        <Image
          src={selectedImage.url}
          alt={selectedImage.alt}
          fill
          className="object-cover transition-all duration-300"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-2">
        {[mainImage, ...thumbnails].map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className={`
              relative aspect-square overflow-hidden rounded-lg 
              ${
                selectedImage.url === image.url
                  ? 'ring-2 ring-[#3399FF]'
                  : 'ring-1 ring-gray-700 hover:ring-gray-500'
              }
              transition-all duration-200
            `}
          >
            <Image src={image.url} alt={image.alt} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
