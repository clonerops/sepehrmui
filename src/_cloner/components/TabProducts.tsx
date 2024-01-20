import { Button, Typography, Box } from "@mui/material";
import { Form, Formik } from "formik";

import FuzzySearch from "../helpers/Fuse";
import FormikRadioGroup from "./FormikRadioGroup";

// import { toAbsoulteUrl } from "../helpers/AssetsHelper";
import { useGetProductTypes, useGetWarehouses } from "../../app/modules/generic/_hooks";
import { dropdownWarehouses } from "../../app/modules/managment-order/helpers/dropdowns";

// const imageUrl: Image[] = [
//     { id: 0, url: "/media/product/border-design.png" },
//     { id: 1, url: "/media/product/tubes.png" },
//     { id: 2, url: "/media/product/beam.png" },
//     { id: 3, url: "/media/product/steel.png" },
//     { id: 4, url: "/media/product/tissue-roll.png" },
//     { id: 5, url: "/media/product/conveyor-belt.png" },
//     { id: 6, url: "/media/product/can.png" },
// ];

type Props = {
    handleSelectionChange: (parameter: any) => void;
    productsByBrand: any;
    onSelectTab: any;
    onFilterProductByWarehouse: any;
    results: any
    setResults: any
    selectedTab: any
    tabResult: any
};

type Image = {
    id?: number | null
    url?: string | null
}

const TabProducts = (props: Props) => {
    const { tabResult, selectedTab, onSelectTab, onFilterProductByWarehouse, setResults, } = props
    const productTypeTools = useGetProductTypes();
    const { data: warehouses } = useGetWarehouses();


    // const renderImageIcon = (index: number) => {
    //     const findImageBasedOfIndex: any = imageUrl.find((item: Image) => item.id === index)
    //     return findImageBasedOfIndex?.url
    // }


    const allOption = [{ value: "-1", label: "همه" }];
    const radioData = [...allOption, ...dropdownWarehouses(warehouses)];

    return (
        <>
            <Button
                className={`${selectedTab == -1 ? "!bg-[#fcc615] !text-black" : ""
                    }`}
                onClick={() => onSelectTab(-1)}
            >
                <Typography className="px-2">کل محصولات</Typography>
            </Button>

            {productTypeTools?.data?.map((item: any, index: number) => {
                return (
                    <Button
                        key={index}
                        className={`${selectedTab == item.id
                            ? "!bg-[#fcc615] !text-black"
                            : ""
                            }`}

                        onClick={() => onSelectTab(item.id)}
                    >
                        {/* <Box
                            component="img"
                            src={toAbsoulteUrl(renderImageIcon(index))}
                            width={20}
                        /> */}
                        <Typography className="px-2">{item.desc}</Typography>
                    </Button>
                );
            })}
            <Box component="div" className="mt-4">
                <Box
                    component="div"
                    className="grid grid-cols-1 md:grid-cols-3 gap-x-4 mb-2"
                >
                    <Box>
                        <FuzzySearch
                            keys={["productName"]}
                            data={tabResult}
                            threshold={0.5}
                            setResults={setResults}
                        />
                    </Box>
                    <Box component="div" className="col-span-2">
                        <Formik initialValues={{warehouseId: "-1"}} onSubmit={() => {}}>
                            {({}) => {
                                return <Form>
                                    <FormikRadioGroup onChange={onFilterProductByWarehouse} radioData={radioData} name="warehouseId" />
                                </Form>
                            }}
                        </Formik>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default TabProducts;
