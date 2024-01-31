import { Box, Button, InputAdornment } from '@mui/material'
import { Edit, Add, Grading } from "@mui/icons-material"
import { FormikProps } from 'formik';
import { UseMutationResult } from '@tanstack/react-query';

import { FieldType } from "../../../../_cloner/components/globalTypes";
import { dropdownProductByBrandName } from '../../generic/_functions';

import FormikCustomer from "../../../../_cloner/components/FormikCustomer";
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
import FormikProximateAmount from '../../product/components/FormikProximateAmount';
import FormikPrice from '../../product/components/FormikPrice';
import FormikAmount from '../../product/components/FormikAmount';

import { ISalesOrder, IOrderItems, IOrderPayment, IOrderService } from '../core/_models';
import TransitionsModal from '../../../../_cloner/components/ReusableModal';
import FormikProduct from '../../../../_cloner/components/FormikProductComboSelect';
import ProductsList from './components/ProductsList';




const saleOrderParseFields = (
    postSaleOrder: UseMutationResult<any, unknown, ISalesOrder, unknown>,
    fields: FieldType,
    ) => {
    const { type, ...rest } = fields;
    
    switch (type) {
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
    isUpdate: boolean,
    postSaleOrder: UseMutationResult<any, unknown, ISalesOrder, unknown>,
    formikRef: React.RefObject<FormikProps<any>>,
    isProductChoose: boolean,
    setState: React.Dispatch<React.SetStateAction<{
        isBuy: boolean;
        orderIndex: number;
        isUpdate: boolean;
        isProductChoose: boolean;
    }>>,    
    products: any,
    changeWarehouseFunction: (values: any) => void,
    changeProductFunction: (values: any) => void,
    handleOrder: (formikRef: React.RefObject<FormikProps<any>>) => void,
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
            return <FormikWarehouse 
                key={index} 
                disabled={isUpdate || postSaleOrder.data?.succeeded} 
                onChange={(value: any) => changeWarehouseFunction(value)} 
                {...rest} />
        case "product":
            return (
                <Box key={index} component="div" className="flex gap-x-2 w-full">
                    <FormikProduct disabled={isUpdate || postSaleOrder.data?.succeeded} onChange={(value: any) => changeProductFunction(value)} options={dropdownProductByBrandName(products?.data?.data)} {...rest} />
                    <Button onClick={() => setState((prev) => ({...prev, isProductChoose: true}))} variant="contained" color="primary" disabled={postSaleOrder.data?.succeeded}>
                        <Grading />
                    </Button>
                    {isProductChoose &&
                        <TransitionsModal title="انتخاب محصول" open={isProductChoose} width='99%' isClose={() => setState((prev) => ({...prev, isProductChoose: false}))}>
                                <ProductsList
                                    formikRef={formikRef}
                                    setState={setState}
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
                                {formikRef.current?.values.productMainUnitDesc}
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
                                {formikRef.current?.values.productSubUnitDesc}
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
                <Button key={index} onClick={() => handleOrder(formikRef)} className="!bg-yellow-500"><Edit /></Button>
             : 
                <Button key={index} onClick={() => handleOrder(formikRef)} className="!bg-green-500"><Add /></Button>
            
        default:
            return <FormikInput key={index} disabled={postSaleOrder.data?.succeeded} {...rest} />;
    }
};

const orderFeatureRenderFields = (
    index: number | string,
    postSaleOrder: UseMutationResult<any, unknown, ISalesOrder, unknown>,
    fields: FieldType) => {
    const { type, ...rest } = fields;
    switch (type) {
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