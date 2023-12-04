import { Box, IconButton, Typography } from '@mui/material'
import { AddCircle } from "@mui/icons-material"
import { FormikErrors } from 'formik';
import { UseMutationResult } from '@tanstack/react-query';

import { FieldType } from "../../../../_cloner/components/globalTypes";

import FormikCustomer from "../../../../_cloner/components/FormikCustomer";
import FormikCompany from '../../../../_cloner/components/FormikCompany';
import FormikDatepicker from '../../../../_cloner/components/FormikDatepicker';
import FormikOrderSend from '../../../../_cloner/components/FormikOrderSend';
import FormikInvoiceType from '../../../../_cloner/components/FormikInvoiceType';
import FormikPaymentType from '../../../../_cloner/components/FormikPaymentType';
import FormikExitType from '../../../../_cloner/components/FormikExitType';
import FormikTemporary from '../../../../_cloner/components/FormikTemporary';
import FormikDescription from '../../../../_cloner/components/FormikDescription';
import FormikInput from '../../../../_cloner/components/FormikInput';

import { ICreateOrder } from '../core/_models';
import { ICustomer } from '../../customer/core/_models';
import { separateAmountWithCommas } from '../../../../_cloner/helpers/SeprateAmount';

const saleOrderParseFields = (
    index: number | string,
    postSaleOrder: UseMutationResult<any, unknown, ICreateOrder, unknown>,
    fields: FieldType,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<any>>,
    values: any,
    customerInformation: ICustomer | undefined | null,
    changeCustomerFunction: (value: any, setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<any>>) => void,
    setOpenState: (value: React.SetStateAction<boolean>) => void,
    customerDetailLoading?: boolean
    ) => {
    const { type, ...rest } = fields;
    
    switch (type) {
        case "customer":
            return (
                <Box key={index} component="div" className="flex flex-col w-full">
                    <Box component="div" className="flex gap-x-2 w-full md:col-span-4">
                        <FormikCustomer disabled={postSaleOrder.data?.succeeded} onChange={(value: any) => changeCustomerFunction(value, setFieldValue)} {...rest} />
                        <IconButton onClick={() => setOpenState(true)} className="flex justify-center items-center cursor-pointer text-xl">
                            <AddCircle color="secondary" />
                        </IconButton>
                        <FormikCompany customerid={values.customerID} name="customerOfficialCompanyId" label="اسم رسمی شرکت مشتری" />
                    </Box>
                    {customerDetailLoading ? (
                        <Typography>درحال بارگزاری ...</Typography>
                    ) : (
                        <Box component="div" className="grid grid-cols-1 md:grid-cols-2 space-y-4 md:space-y-0 mt-4">
                            <Box component="div" className="flex flex-row pt-2">
                                <Typography variant="h4" className="text-gray-500">معرف: </Typography>
                                <Typography variant="h3" className="px-4">{customerInformation?.representative} </Typography>
                            </Box>
                            <Box component="div" className="flex flex-row pt-2">
                                <Typography sx={{ backgroundColor: `#${customerInformation?.customerValidityColorCode}` }} variant="h3" className={`text-white px-4 rounded-md py-1`}>{customerInformation?.customerValidityDesc}</Typography>
                            </Box>
                            <Box component="div" className="flex flex-row pt-8">
                                <Typography variant="h4" className="text-gray-500">بدهی جاری: </Typography>
                                <Typography variant="h3" className="px-4 text-red-500">{customerInformation?.customerCurrentDept ? separateAmountWithCommas(Number(customerInformation?.customerCurrentDept)) : 0} ریال</Typography>
                            </Box>
                            <Box component="div" className="flex flex-row pt-8">
                                <Typography variant="h4" className="text-gray-500">بدهی کل: </Typography>
                                <Typography variant="h3" className="px-4 text-red-500">{customerInformation?.customerDept ? separateAmountWithCommas(Number(customerInformation?.customerDept)) : 0} ریال</Typography>
                            </Box>
                        </Box>
                    )}
                </Box>
            );
        case "settlementDate":
            return <FormikDatepicker {...rest} />;
        case "orderSendTypeId":
            return <FormikOrderSend disabled={postSaleOrder.data?.succeeded} {...rest} />
        case "invoiceTypeId":
            return <FormikInvoiceType disabled={postSaleOrder.data?.succeeded} {...rest} />
        case "paymentTypeId":
            return <FormikPaymentType disabled={postSaleOrder.data?.succeeded} {...rest} />
        case "exitType":
            return <FormikExitType disabled={postSaleOrder.data?.succeeded} {...rest} />
        case "temporary":
            return <FormikTemporary disabled={postSaleOrder.data?.succeeded} {...rest} />
        case "description":
            return <FormikDescription disabled={postSaleOrder.data?.succeeded} {...rest} />
        default:
            return <FormikInput {...rest} />;
    }
};


export {
    saleOrderParseFields
}