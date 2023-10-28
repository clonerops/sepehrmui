import { useState, useEffect } from 'react'
import { Box, Typography, Button } from "@mui/material"
import ReusableCard from "../../../_cloner/components/ReusableCard"
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid"
import { columnsModalProduct } from "../order/helpers/columns"
import { useRetrieveProductsByBrand } from "../product/core/_hooks"

const ProductPriceLanding = () => {
    const { data: productsByBrand } = useRetrieveProductsByBrand();
    const [filteredData, setFilteredData] = useState([]);
    useEffect(() => {
        setFilteredData(productsByBrand?.data)
    }, [productsByBrand])

    const renderAction = () => { }

    const filterCard: any = [
        {id: 1, productType: 1, title: "نبشی"},
        {id: 2, productType: 2, title: "میلگرد"},
        {id: 3, productType: 3, title: "ناودانی"},
        {id: 4, productType: 4, title: "تیرآهن"},
        {id: 5, productType: 5, title: "سپری"},
        {id: 6, productType: 6, title: "تسمه"},
        {id: 7, productType: 7, title: "قوطی"},
    ]

    const filterByProductTypeId = (type: number) => {
        switch (type) {
            case 1:
                const filteredNabshi = productsByBrand?.data?.filter((i: any) => i.productTypeId === type)
                setFilteredData(filteredNabshi)
                break;
            case 2:
                const filteredMilgerd = productsByBrand?.data?.filter((i: any) => i.productTypeId === type)
                setFilteredData(filteredMilgerd)
                break;
            case 3:
                const filteredNavdani = productsByBrand?.data?.filter((i: any) => i.productTypeId === type)
                setFilteredData(filteredNavdani)
                break;
            case 4:
                const filteredTirahan = productsByBrand?.data?.filter((i: any) => i.productTypeId === type)
                setFilteredData(filteredTirahan)
                break;
            case 5:
                const filteredSepary = productsByBrand?.data?.filter((i: any) => i.productTypeId === type)
                setFilteredData(filteredSepary)
                break;
            case 6:
                const filteredTasme = productsByBrand?.data?.filter((i: any) => i.productTypeId === type)
                setFilteredData(filteredTasme)
                break;
            case 7:
                const filteredGhoti = productsByBrand?.data?.filter((i: any) => i.productTypeId === type)
                setFilteredData(filteredGhoti)
                break;
        
            default:
                setFilteredData(filteredData)
                break;
        }
    }

    return (
        <>
            <Box component="div" className="flex pb-4">
                {filterCard.map((item: any) => {
                    return <Button onClick={() => filterByProductTypeId(item?.productType)}>
                    <ReusableCard cardClassName="!bg-[#35155D] hover:!bg-[#9F0D7F] transition cursor-pointer">
                        <Typography className="text-white px-2">{item?.title}</Typography>
                    </ReusableCard>
                </Button>
                })}
            </Box>
            <MuiDataGrid
                columns={columnsModalProduct(renderAction)}
                rows={filteredData}
                data={filteredData}
            />
        </>

    )
}

export default ProductPriceLanding