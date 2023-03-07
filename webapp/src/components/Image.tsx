import React from 'react';

interface Image {
  src: string;
  alt: string;
}

const ImageComponent: React.FC<Image> = ({ src, alt }) => {
    return <img src={src} alt={alt} />;
};
  
export default ImageComponent;
  