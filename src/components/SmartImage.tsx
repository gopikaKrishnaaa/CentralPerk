'use client';

import React from 'react';
import NextImage from 'next/image';

interface SmartImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

/**
 * SmartImage: Renders next/image for local files, and standard <img> for data URIs.
 * This prevents next/image errors on data:image/* and external URLs.
 */
export const SmartImage: React.FC<SmartImageProps> = ({ src, alt, fill, width, height, className, priority }) => {
  const isDataUri = src.startsWith('data:');
  
  if (isDataUri) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        style={fill ? { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' } : { width, height }}
        loading="lazy"
      />
    );
  }

  if (fill) {
    return (
      <NextImage
        src={src}
        alt={alt}
        fill
        className={className}
        priority={priority}
      />
    );
  }

  return (
    <NextImage
      src={src}
      alt={alt}
      width={width || 600}
      height={height || 400}
      className={className}
      priority={priority}
    />
  );
};

export default SmartImage;
