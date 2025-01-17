'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

interface AvatarUploadProps {
  currentAvatar?: string | null;
  onUpload: (file: File) => Promise<void>;
}

export function AvatarUpload({ currentAvatar, onUpload }: AvatarUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentAvatar || null);
  const [isHovering, setIsHovering] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload
    await onUpload(file);
  };

  const defaultAvatar =
    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23666"%3E%3Cpath d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"%2F%3E%3C%2Fsvg%3E';

  return (
    <div className="flex flex-col items-center space-y-4">
      <div
        className="relative group"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div
          className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-[var(--primary-color)] cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <Image
            src={previewUrl || defaultAvatar}
            alt="Profile avatar"
            fill
            className="object-cover"
          />
          {isHovering && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity">
              <span className="text-white text-sm font-medium">Change Photo</span>
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileSelect}
        />
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Click to upload a new profile photo
      </p>
    </div>
  );
}
