import { Button, Typography } from "@mui/material";
import { Formik } from "formik";

import FuzzySearch from "../helpers/fuse";
import FormikRadioGroup from "./FormikRadioGroup";

import { useGetProductTypes, useGetWarehouseTypes } from "../../app/modules/generic/_hooks";
import { dropdownWarehouseType } from "../helpers/dropdowns";
import { useAuth } from "../helpers/checkUserPermissions";


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
    const { hasPermission } = useAuth()

    const { tabResult, selectedTab, onSelectTab, onFilterProductByWarehouse, setResults, } = props
    const productTypeTools = useGetProductTypes(hasPermission("GetProductTypes"));
    const warehouseTypeTools = useGetWarehouseTypes(hasPermission("GetWarehouseTypes"));

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
                        <Typography className="px-2">{item.desc}</Typography>
                    </Button>
                );
            })}
            <div className="mt-4">
                <div
                    className="grid grid-cols-1 md:grid-cols-3 gap-x-4 mb-2"
                >
                    <div>
                        <FuzzySearch
                            keys={["productName"]}
                            data={tabResult}
                            setResults={setResults}
                        />
                    </div>
                    <div className="col-span-2">
                        <Formik initialValues={{warehouseId: "-1"}} onSubmit={() => {}}>
                            {({}) => {
                                return <form>
                                    {/* <FormikRadioGroup onChange={onFilterProductByWarehouse} radioData={radioData} name="warehouseId" /> */}
                                     <FormikRadioGroup onChange={onFilterProductByWarehouse} radioData={dropdownWarehouseType(warehouseTypeTools?.data)} name="warehouseId" />
                                </form>
                            }}
                        </Formik>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TabProducts;
