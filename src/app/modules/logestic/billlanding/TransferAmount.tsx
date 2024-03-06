import { Box, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import FormikInput from "../../../../_cloner/components/FormikInput";
import ButtonComponent from "../../../../_cloner/components/ButtonComponent";
import { FC, useState } from "react";
import { EnqueueSnackbar } from "../../../../_cloner/helpers/Snackebar";

interface IProps {
    item: any
    productForBilllanding: any[]
    setProductForBilllanding: React.Dispatch<React.SetStateAction<any[]>>
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const TransferAmount:FC<IProps> = ({item, setIsOpen, productForBilllanding, setProductForBilllanding}) => {
    console.log(item)
    const handleSetAmountForBilllanding = (values: any) => {
        const cpProductForBilllanding = [...productForBilllanding]
        const newValue = {
            productCode: item.productCode,
            productName: item.productName,
            productBrandName: item.productBrandName,
            productBrandId: item.productBrandId,
            transferAmount: +values.transferAmount,
        }

        if(+values.transferAmount > +item.purchaseInventory){
            EnqueueSnackbar("مقدار واردشده بیشتر از موجودی می باشد", "error")
            return;
        }
        
        let isExist = productForBilllanding.some((obj) => {
            return  item.productBrandId === obj.productBrandId
        })
        
        if(isExist){
            EnqueueSnackbar("کالای انتخاب شده در لیست انتقالی ها وجود دارد", "error")
            return;
        }

        setProductForBilllanding([...cpProductForBilllanding, newValue])
        setIsOpen(false)
    }

    return (
        <>
            <Box className="flex flex-row justify-between items-center flex-wrap gap-4 bg-slate-100 p-4 rounded-md mt-4">
                <Box className="flex flex-col gap-y-4">
                    <Typography variant="h4">کد کالا</Typography>
                    <Typography variant="h3" className="text-gray-500">{item.productCode}</Typography>
                </Box>
                <Box className="flex flex-col gap-y-4">
                    <Typography variant="h4">نام کالا</Typography>
                    <Typography variant="h3" className="text-gray-500">{item.productName}</Typography>
                </Box>
                <Box className="flex flex-col gap-y-4">
                    <Typography variant="h4">برند</Typography>
                    <Typography variant="h3" className="text-gray-500">{item.productBrandName}</Typography>
                </Box>
                <Box className="flex flex-col gap-y-4">
                    <Typography variant="h4">موجودی</Typography>
                    <Typography variant="h3" className="text-gray-500">{item.purchaseInventory}</Typography>
                </Box>
            </Box>
            <Formik initialValues={{transferAmount: ""}} onSubmit={handleSetAmountForBilllanding}>
                {({values}) => {
                    return <Form className="my-4">
                        <FormikInput name="transferAmount" label="مقدار موردنظر جهت انتقال" />
                        <Box className="flex justify-end items-end my-4">
                            <ButtonComponent onClick={() => handleSetAmountForBilllanding(values)}>
                                <Typography className="text-white">ثبت</Typography>
                            </ButtonComponent>
                        </Box>
                    </Form>;    
                }}
            </Formik>
        </>
    );
};

export default TransferAmount;
