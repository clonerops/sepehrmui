import { Typography } from "@mui/material";
import { Formik } from "formik";
import { FC } from "react";
import { EnqueueSnackbar } from "../../../_cloner/helpers/snackebar";

import FormikInput from "../../../_cloner/components/FormikInput";
import ButtonComponent from "../../../_cloner/components/ButtonComponent";
import { separateAmountWithCommas } from "../../../_cloner/helpers/seprateAmount";

interface IProps {
    item: any
    productForTransferRemittance: any[]
    setProductForTransferRemittance: React.Dispatch<React.SetStateAction<any[]>>
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const TransferAmount:FC<IProps> = ({item, setIsOpen, productForTransferRemittance, setProductForTransferRemittance}) => {
    const handleSetAmountForTransferRemittance = (values: any) => {
        const cpProductForTransferRemittance = [...productForTransferRemittance]
        const newValue = {
            id: item.id,
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
        
        let isExist = productForTransferRemittance.some((obj) => {
            return  item.productBrandId === obj.productBrandId
        })
        
        if(isExist){
            EnqueueSnackbar("کالای انتخاب شده در لیست انتقالی ها وجود دارد", "error")
            return;
        }

        setProductForTransferRemittance([...cpProductForTransferRemittance, newValue])
        setIsOpen(false)
    }

    return (
        <>
            <div className="flex flex-row justify-between items-center flex-wrap gap-4 bg-slate-100 p-4 rounded-md mt-4">
                <div className="flex flex-col gap-y-4">
                    <Typography variant="h4">کد کالا</Typography>
                    <Typography variant="h3" className="text-gray-500">{item.productCode}</Typography>
                </div>
                <div className="flex flex-col gap-y-4">
                    <Typography variant="h4">نام کالا</Typography>
                    <Typography variant="h3" className="text-gray-500">{item.productName}</Typography>
                </div>
                <div className="flex flex-col gap-y-4">
                    <Typography variant="h4">برند</Typography>
                    <Typography variant="h3" className="text-gray-500">{item.productBrandName}</Typography>
                </div>
                <div className="flex flex-col gap-y-4">
                    <Typography variant="h4">موجودی تقریبی</Typography>
                    <Typography variant="h3" className="text-gray-500">{separateAmountWithCommas(item.approximateInventory)}</Typography>
                </div>
                <div className="flex flex-col gap-y-4">
                    <Typography variant="h4">موجودی خرید</Typography>
                    <Typography variant="h3" className="text-gray-500">{separateAmountWithCommas(item.purchaseInventory)}</Typography>
                </div>
            </div>
            <Formik initialValues={{transferAmount: ""}} onSubmit={handleSetAmountForTransferRemittance}>
                {({values}) => {
                    return <>
                        <FormikInput autoFocus={true} name="transferAmount" label="مقدار موردنظر جهت انتقال" />
                        <div className="flex justify-end items-end my-4">
                            <ButtonComponent onClick={() => handleSetAmountForTransferRemittance(values)}>
                                <Typography className="text-white">ثبت</Typography>
                            </ButtonComponent>
                        </div>
                    </>;    
                }}
            </Formik>
        </>
    );
};

export default TransferAmount;
