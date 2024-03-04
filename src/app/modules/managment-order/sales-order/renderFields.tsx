import { Box, Button, InputAdornment, Typography } from '@mui/material'
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
import FormikProximateAmount from '../../../../_cloner/components/FormikProximateAmount';
import FormikPrice from '../../../../_cloner/components/FormikPrice';
import FormikAmount from '../../../../_cloner/components/FormikAmount';

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
    orderFeatureRenderFields
}