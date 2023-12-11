import { Box, IconButton, Typography, Button, InputAdornment } from '@mui/material'
import { AddCircle, Edit, Add, Grading } from "@mui/icons-material"
import { FormikErrors } from 'formik';
import { UseMutationResult } from '@tanstack/react-query';

import { FieldType } from "../../../../_cloner/components/globalTypes";
import { separateAmountWithCommas } from '../../../../_cloner/helpers/SeprateAmount';
import { dropdownProductByBrandName } from '../../generic/_functions';
import { useRetrieveProductsByBrand } from '../../product/core/_hooks';

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
import FormikWarehouse from '../../../../_cloner/components/FormikWarehouse';
import FormikProduct from '../components/FormikProductComboSelect';
import ProductSelectedListInModal from '../components/ProductSelectedListInModal';
import FormikPurchaserInvoiceType from '../../../../_cloner/components/FormikPurchaserInvoiceType';
import FormikProximateAmount from '../../product/components/FormikProximateAmount';
import FormikPrice from '../../product/components/FormikPrice';
import FormikAmount from '../../product/components/FormikAmount';

import { ICreateOrder, IOrderItems, IOrderPayment, IOrderService } from '../core/_models';
import { ICustomer } from '../../customer/core/_models';
import TransitionsModal from '../../../../_cloner/components/ReusableModal';
import ProductsList from '../components/ProductsList';




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
                        <FormikCustomer disabled={postSaleOrder?.data?.succeeded} onChange={(value: any) => changeCustomerFunction(value, setFieldValue)} {...rest} />
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

const orderDetailParseFields = (
    index: number | string,
    fields: FieldType,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<any>>,
    values: any,
    isUpdate: boolean,
    postSaleOrder: UseMutationResult<any, unknown, ICreateOrder, unknown>,
    isProductChoose: boolean,
    setState: React.Dispatch<React.SetStateAction<{
        isBuy: boolean;
        orderIndex: number;
        isUpdate: boolean;
        isProductChoose: boolean;
    }>>,    
    products: any,
    changeWarehouseFunction: (values: any, setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<any>>) => void,
    changeProductFunction: (values: any, setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<any>>) => void,
    handleOrder: (values: any, setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void | FormikErrors<any>>) => void,
    orders: IOrderItems[],
    setOrders: React.Dispatch<React.SetStateAction<IOrderItems[]>>,
    orderPayment: IOrderPayment[],
    setOrderPayment: React.Dispatch<React.SetStateAction<IOrderPayment[]>>,
    orderService: IOrderService[],
    setOrderService: React.Dispatch<React.SetStateAction<IOrderService[]>>,
    

    ) => {
    const { type, ...rest } = fields;
    switch (type) {
        case "warehouse":
            return <FormikWarehouse key={index} disabled={isUpdate || postSaleOrder.data?.succeeded} onChange={(value: any) => changeWarehouseFunction(value, setFieldValue)} {...rest} />
        case "product":
            return (
                <Box key={index} component="div" className="flex gap-x-2 w-full">
                    <FormikProduct disabled={isUpdate || postSaleOrder.data?.succeeded} onChange={(value: any) => changeProductFunction(value, setFieldValue)} options={dropdownProductByBrandName(products?.data?.data)} {...rest} />
                    <Button onClick={() => setState((prev) => ({...prev, isProductChoose: true}))} variant="contained" color="primary" disabled={postSaleOrder.data?.succeeded}>
                        <Grading />
                    </Button>
                    {isProductChoose &&
                        <TransitionsModal title="انتخاب محصول" open={isProductChoose} width='80%' isClose={() => setState((prev) => ({...prev, isProductChoose: false}))}>
                            <ProductsList
                                products={products?.data?.data}
                                productLoading={products.isLoading}
                                productError={products.isError}
                                setState={setState}
                                setFieldValue={setFieldValue}
                                orders={orders}
                                setOrders={setOrders}
                                setOrderPayment={setOrderPayment}
                                orderService={orderService}
                            />
                        </TransitionsModal>
                    }
                </Box>
            );
        case "purchaserCustomer":
            return <FormikCustomer key={index} disabled={postSaleOrder.data?.succeeded} {...rest} />
        case "purchaseInvoiceType":
            return <FormikPurchaserInvoiceType key={index} {...rest} />
        case "date":
            return <FormikDatepicker key={index} disabled={postSaleOrder.data?.succeeded} {...rest} />;
        case "proximateAmount":
            return (
                <FormikProximateAmount
                    key={index}
                    disabled={postSaleOrder.data?.succeeded}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                {values.productMainUnitDesc}
                            </InputAdornment>
                        ),
                    }}
                    {...rest}
                />
            );
        case "proximateSubUnit":
            return (
                <FormikPrice
                    key={index}    
                    disabled={postSaleOrder.data?.succeeded}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                {values.productSubUnitDesc}
                            </InputAdornment>
                        ),
                    }}
                    {...rest}
                />
            );
        case "price":
            return <FormikAmount key={index} disabled={postSaleOrder.data?.succeeded}  {...rest} />
        case "input":
            return <FormikInput key={index} disabled={postSaleOrder.data?.succeeded}  {...rest} />;
        case "add":
            return isUpdate ? 
                <Button key={index} onClick={() => handleOrder(values, setFieldValue)} className="!bg-yellow-500"><Edit /></Button>
             : 
                <Button key={index} onClick={() => handleOrder(values, setFieldValue)} className="!bg-green-500"><Add /></Button>
            
        default:
            return <FormikInput key={index} disabled={postSaleOrder.data?.succeeded} {...rest} />;
    }
};

const orderFeatureRenderFields = (
    index: number | string,
    postSaleOrder: UseMutationResult<any, unknown, ICreateOrder, unknown>,
    fields: FieldType) => {
    const { type, ...rest } = fields;
    switch (type) {
        case "settlementDate":
            return <FormikDatepicker key={index} {...rest} />;
        case "orderSendTypeId":
            return <FormikOrderSend key={index} disabled={postSaleOrder?.data?.succeeded} {...rest} />
        case "invoiceTypeId":
            return <FormikInvoiceType key={index} disabled={postSaleOrder?.data?.succeeded} {...rest} />
        case "paymentTypeId":
            return <FormikPaymentType key={index} disabled={postSaleOrder?.data?.succeeded} {...rest} />
        case "exitType":
            return <FormikExitType key={index} disabled={postSaleOrder?.data?.succeeded} {...rest} />
        case "temporary":
            return <FormikTemporary key={index} disabled={postSaleOrder?.data?.succeeded} {...rest} />
        case "description":
            return <FormikDescription key={index} disabled={postSaleOrder?.data?.succeeded} {...rest} />
        default:
            return <FormikInput key={index} {...rest} />;
    }
};


export {
    saleOrderParseFields,
    orderDetailParseFields,
    orderFeatureRenderFields
}