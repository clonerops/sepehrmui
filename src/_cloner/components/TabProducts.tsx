import React from "react";
import { Button, Typography, Box } from "@mui/material";
import { toAbsoulteUrl } from "../helpers/AssetsHelper";
import { useGetProductTypes } from "../../app/modules/generic/_hooks";
const TabProducts = () => {
    const productTypeTools = useGetProductTypes();

    const imageUrl = [
        { id: 1, url: "/media/product/border-design.png" },
        { id: 2, url: "/media/product/tubes.png" },
        { id: 3, url: "/media/product/beam.png" },
        { id: 4, url: "/media/product/steel.png" },
        { id: 5, url: "/media/product/tissue-roll.png" },
        { id: 6, url: "/media/product/conveyor-belt.png" },
        { id: 7, url: "/media/product/can.png" },
    ];
    const image: any = (index: number) => {
        switch (index) {
            case 0:
                return imageUrl[0].url;
            case 1:
                return imageUrl[1].url;
            case 2:
                return imageUrl[2].url;
            case 3:
                return imageUrl[3].url;
            case 4:
                return imageUrl[4].url;
            case 5:
                return imageUrl[5].url;
            case 6:
                return imageUrl[6].url;

            default:
                break;
        }
    };


    return (
        <>
            {productTypeTools?.data?.map((item: any, index: number) => {
                return (
                    <Button>
                        <Box
                            component="img"
                            src={toAbsoulteUrl(image(index))}
                            width={20}
                        />
                        <Typography className="px-2">{item.desc}</Typography>
                    </Button>
                );
            })}
            
            

        </>
    );
};

export default TabProducts;
