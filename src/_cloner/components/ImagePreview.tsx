import React, { useState, useEffect } from "react";
import Zoom from 'react-medium-image-zoom'
import { Typography } from "@mui/material";

interface ImagePreviewProps {
    base64Strings: string[];
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ base64Strings }) => {
    const [imageSrcs, setImageSrcs] = useState<string[]>([]);

    const dataURLs = base64Strings.map(
        (base64String: any) => `data:image/png;base64,${base64String.fileData}`
    );


    useEffect(() => {
        setImageSrcs(dataURLs);
        // eslint-disable-next-line
    }, [base64Strings]);

    // Function to handle image load
    const handleImageLoad = (index: number) => {
        const newImageSrcs = [...imageSrcs];
        newImageSrcs[index] = dataURLs[index];
        setImageSrcs(newImageSrcs);
    };


    return (

        <div className="flex flex-wrap gap-x-8">
            {/* Display the image previews */}
            {dataURLs.map((dataURL, index) => (
                <div key={index}>
                    {imageSrcs[index] ? (
                        <Zoom>
                            <img
                                src={`${imageSrcs[index]}`}
                                alt={`Preview ${index + 1}`}
                                onLoad={() => handleImageLoad(index)}
                                width={200}
                                height={200}
                                className="rounded-md cursor-pointer"
                            />
                        </Zoom>
                    ) : (
                        <Typography variant="h3">درحال بارگزاری...</Typography>
                    )}

                    {/* Download button */}
                    {imageSrcs[index] && (
                        <a
                            href={dataURL}
                            download={`image${index + 1}.png`}
                            style={{ display: "block", marginTop: "10px", backgroundColor:"green", color:"white", borderRadius: "4px", textAlign: "center" }}
                        >
                            <Typography>دانلود</Typography>
                        </a>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ImagePreview;
