import React, { useState } from 'react';

interface ImagePreviewProps {
  base64Strings: string[];
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ base64Strings }) => {
  const [imageSrcs, setImageSrcs] = useState<string[]>([]);

  // Convert base64 strings to data URLs
  const dataURLs = base64Strings.map((base64String) => `data:image/png;base64,${base64String}`);

  // Function to handle image load
  const handleImageLoad = (index: number) => {
    const newImageSrcs = [...imageSrcs];
    newImageSrcs[index] = dataURLs[index];
    setImageSrcs(newImageSrcs);
  };

  return (
    <div>
      {/* Display the image previews */}
      {dataURLs.map((dataURL, index) => (
        <div key={index}>
          {imageSrcs[index] ? (
            <img src={imageSrcs[index]} alt={`Preview ${index + 1}`} onLoad={() => handleImageLoad(index)} />
          ) : (
            <p>Loading...</p>
          )}

          {/* Download button */}
          {imageSrcs[index] && (
            <a href={dataURL} download={`image${index + 1}.png`} style={{ display: 'block', marginTop: '10px' }}>
              Download Image {index + 1}
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

export default ImagePreview;
