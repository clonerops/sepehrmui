import { IconButton, Typography, Button, InputAdornment } from '@mui/material'
import { AddCircle, Edit, Add, Grading } from "@mui/icons-material"
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
import FormikWarehouse from '../../../../_cloner/components/FormikWarehouse';
import FormikPurchaserInvoiceType from '../../../../_cloner/components/FormikPurchaserInvoiceType';
import FormikProximateAmount from '../../../../_cloner/components/FormikProximateAmount';
import FormikPrice from '../../../../_cloner/components/FormikPrice';
import FormikAmount from '../../../../_cloner/components/FormikAmount';

import { ISalesOrder, IOrderItems, IOrderPayment, IOrderService, IPurchaserOrder } from '../core/_models';
import { ICustomer } from '../../customer/core/_models';
import TransitionsModal from '../../../../_cloner/components/ReusableModal';
import ProductsList from './components/ProductsList';
import FormikProductBrand from '../../../../_cloner/components/FormikProductBrandComboSelect';




const saleOrderParseFields = (
    index: number | string,
    postSaleOrder: UseMutationResult<any, unknown, IPurchaserOrder, unknown>,
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
                <div key={index} className="flex flex-col w-full">
                    <div className="flex flex-col space-y-4">
                        <Typography variant="h2">انتخاب فروشنده</Typography>
                        <Typography variant="body1" className='text-violet-800'>از طریق لیست زیر، فروشنده ای که قصد خرید کالا از آن دارید را انتخاب نمایید</Typography>
                        <FormikCustomer disabled={postSaleOrder?.data?.succeeded} onChange={(value: any) => changeCustomerFunction(value, setFieldValue)} {...rest} />
                    </div>
                </div>
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
    postSaleOrder: UseMutationResult<any, unknown, ISalesOrder, unknown>,
    isProductChoose: boolean,
    setState: React.Dispatch<React.SetStateAction<{
        isBuy: boolean;
        orderIndex: number;
        isUpdate: boolean;
        isProductChoose: boolean;
    }>>,    
    products: any,
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
        case "product":
            return (
                <div key={index} className="flex gap-x-2 w-full">
                    <FormikProductBrand disabled={isUpdate || postSaleOrder.data?.succeeded || orderPayment.length > 0} onChange={(value: any) => changeProductFunction(value, setFieldValue)} {...rest} />
                </div>
            );
        case "purchaserCustomer":
            return <FormikCustomer key={index} disabled={postSaleOrder.data?.succeeded || orderPayment.length > 0} {...rest} />
            case "settlementDate":
                return <FormikDatepicker {...rest} />;    
        case "purchaseInvoiceType":
            return <FormikPurchaserInvoiceType key={index} {...rest} />
        case "date":
            return <FormikDatepicker key={index} disabled={postSaleOrder.data?.succeeded || orderPayment.length > 0} {...rest} />;
        case "proximateAmount":
            return (
                <FormikProximateAmount
                    key={index}
                    disabled={postSaleOrder.data?.succeeded || orderPayment.length > 0}
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
                    disabled={postSaleOrder.data?.succeeded || orderPayment.length > 0}
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
            return <FormikAmount key={index} disabled={postSaleOrder.data?.succeeded || orderPayment.length > 0}  {...rest} />
        case "input":
            return <FormikInput key={index} disabled={postSaleOrder.data?.succeeded || orderPayment.length > 0}  {...rest} />;
        case "add":
            return isUpdate ? 
                <Button disabled={orderPayment.length > 0} key={index} onClick={() => handleOrder(values, setFieldValue)} className="!bg-yellow-500"><Edit /></Button>
             : 
                <Button disabled={orderPayment.length > 0} key={index} onClick={() => handleOrder(values, setFieldValue)} className="!bg-green-500"><Add /></Button>
            
        default:
            return <FormikInput key={index} disabled={postSaleOrder.data?.succeeded || orderPayment.length > 0} {...rest} />;
    }
};

const orderFeatureRenderFields = (
    index: number | string,
    postSaleOrder: UseMutationResult<any, unknown, ISalesOrder, unknown>,
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