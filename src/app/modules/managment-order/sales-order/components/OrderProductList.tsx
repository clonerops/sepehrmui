import { FC, memo, useEffect, useCallback } from "react";
import { Delete } from "@mui/icons-material";
import { calculateTotalAmount } from "../../helpers/functions";
import { IOrderItems, IOrderPayment, IOrderService } from "../../core/_models";
import { separateAmountWithCommas } from "../../../../../_cloner/helpers/seprateAmount";
import { FormikErrors } from "formik";
import { BUY_WAREHOUSE_TYPES } from "../../helpers/constants";
import MuiDataGridCustomRowStyle from "../../../../../_cloner/components/MuiDataGridCustomRowStyle";
import { IProducts } from "../../../products/_models";
import { OrderListColumn } from "../../../../../_cloner/helpers/columns";

interface IProps {
    orders?: IOrderItems[];
    orderServices?: IOrderService[];
    setOrders?: React.Dispatch<React.SetStateAction<IOrderItems[]>>;
    setOrderPayment?: React.Dispatch<React.SetStateAction<IOrderPayment[]>>;
    selectedOrderIndex?: number;
    products?: IProducts[];
    setOrderValid: React.Dispatch<React.SetStateAction<boolean>>;
    setOrderIndex: React.Dispatch<React.SetStateAction<number>>;
    disabled?: boolean;
    setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
    values: any;
    orderValid: boolean;
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean
    ) => Promise<void | FormikErrors<any>>;
}

const OrderProductList: FC<IProps> = ({
    orders = [],
    orderServices,
    setOrders,
    setOrderPayment,
    setOrderValid,
    disabled = false,
    setIsUpdate,
    setOrderIndex,
    setFieldValue,
}) => {
    const handleDeleteFromList = useCallback(
        (indexToDelete: any) => {
            if (!orders || !setOrders || !setOrderPayment || !setFieldValue) return;

            const updatedOrders = orders.filter(
                (order) => order.productBrandId !== indexToDelete.row.productBrandId
            );

            setOrders(updatedOrders);
            setOrderPayment([]);
            setFieldValue(
                "orderPaymentAmount",
                separateAmountWithCommas(calculateTotalAmount(updatedOrders, orderServices))
            );
        },
        [orders, orderServices, setOrders, setOrderPayment, setFieldValue]
    );

    const renderActions = useCallback(
        (index: any) => {
            if (disabled) return null;
            return (
                <div onClick={() => handleDeleteFromList(index)} className="cursor-pointer">
                    <Delete className="text-red-500" />
                </div>
            );
        },
        [disabled, handleDeleteFromList]
    );

    const onDoubleClick = useCallback(
        (params: any) => {
            if (!orders) return;

            const selectedRow = orders.find(
                (order) => order.productBrandId === params.row.productBrandId
            );
            if (!selectedRow) return;

            const rowIndex = orders.indexOf(selectedRow);
            setOrderIndex(rowIndex);

            const fieldValue = [
                { title: "productName", value: params.row.productName },
                { title: "id", value: params.row.id },
                { title: "productId", value: params.row.productId },
                // { title: "price", value: params.row.price.toString() },
                // { title: "productPrice", value: params.row.productPrice.toString() },
                { title: "productPrice", value: separateAmountWithCommas(params.row.productPrice) },
                { title: "productBrandId", value: params.row.productBrandId },
                { title: "productBrandName", value: params.row.productBrandName },
                { title: "warehouseId", value: params.row.warehouseId },
                { title: "warehouseTypeId", value: params.row.warehouseTypeId },
                { title: "proximateAmount", value: params.row.proximateAmount },
                { title: "warehouseName", value: params.row.warehouseName },
                {
                    title: "proximateSubUnit",
                    value: params.row.exchangeRate
                        ? Math.ceil(+params.row.proximateAmount.replace(/,/g, "") / params.row.exchangeRate)
                        : params.row.proximateSubUnit,
                },
                // {
                //     title: "productSubUnitAmount",
                //     value: params.row.exchangeRate
                //         ? Math.ceil(+params.row.proximateAmount.replace(/,/g, "") / params.row.exchangeRate)
                //         : params.row.productSubUnitAmount,
                // },
                {
                    title: "productSubUnitAmount",
                    value: params.row.productSubUnitAmount,
                },
                { title: "purchasePrice", value: separateAmountWithCommas(params.row.purchasePrice) },
                { title: "purchaseInvoiceTypeDesc", value: params.row.purchaseInvoiceTypeDesc },
                { title: "purchaseInvoiceTypeId", value: params.row.purchaseInvoiceTypeId },
                { title: "purchaseSettlementDate", value: params.row.purchaseSettlementDate },
                { title: "purchaserCustomerId", value: params.row.purchaserCustomerId },
                { title: "purchaserCustomerName", value: params.row.purchaserCustomerName },
                { title: "rowId", value: params.row.rowId },
                { title: "detailDescription", value: params.row.description },
                { title: "productMainUnitDesc", value: params.row.productMainUnitDesc },
                { title: "productSubUnitDesc", value: params.row.productSubUnitDesc },
                { title: "productSubUnitId", value: params.row.productSubUnitId },
                { title: "exchangeRate", value: params.row.exchangeRate },
            ];

            fieldValue.forEach(({ title, value }) => setFieldValue(title, value));
            setIsUpdate(true);
        },
        [orders, setFieldValue, setIsUpdate, setOrderIndex]
    );

    const filteredColumns = OrderListColumn(renderActions).filter(
        (column) =>
            ![
                "warehouseId",
                "warehouseTypeId",
                "productBrandId",
                "rowId",
                "purchaseSettlementDate",
                "purchaserCustomerId",
                "purchaserCustomerName",
                "purchaseInvoiceTypeId",
                "productDesc",
            ].includes(column.field)
    );

    const getRowClassName = (params: any) => {
        const {
            row: {
                warehouseTypeId,
                purchaseSettlementDate,
                purchasePrice,
                proximateAmount,
                purchaseInvoiceTypeId,
                purchaserCustomerName,
                // price,
                productPrice,
            },
        } = params;

        if (
            BUY_WAREHOUSE_TYPES.includes(warehouseTypeId) &&
            (!purchaseSettlementDate ||
                !purchasePrice ||
                !proximateAmount ||
                !purchaseInvoiceTypeId ||
                !purchaserCustomerName ||
                // !price || price === "0" || price === 0)
                !productPrice || productPrice === "0" || productPrice === 0)
        ) {
            return "custom-row-style";
        }

        if (
            !BUY_WAREHOUSE_TYPES.includes(warehouseTypeId) &&
            // (!proximateAmount || !price || price === "0" || price === 0)
            (!proximateAmount || !productPrice || productPrice === "0" || productPrice === 0)
        ) {
            return "custom-row-style";
        }

        return "";
    };

    const validateOrders = (orders: any[]) =>
        orders.every((order) => {
            const {
                warehouseTypeId,
                purchaseSettlementDate,
                purchasePrice,
                proximateAmount,
                purchaseInvoiceTypeId,
                purchaserCustomerName,
                // price,
                productPrice,
            } = order;

            if (
                BUY_WAREHOUSE_TYPES.includes(warehouseTypeId) &&
                (!purchaseSettlementDate ||
                    !purchasePrice ||
                    !proximateAmount ||
                    !purchaseInvoiceTypeId ||
                    !purchaserCustomerName ||
                    // !price || price === "0" || price === 0)
                    !productPrice || productPrice === "0" || productPrice === 0)
            ) {
                return false;
            }

            if (
                !BUY_WAREHOUSE_TYPES.includes(warehouseTypeId) &&
                // (!proximateAmount || !price || price === "0" || price === 0)
                (!proximateAmount || !productPrice || productPrice === "0" || productPrice === 0)
            ) {
                return false;
            }

            return true;
        });

    useEffect(() => {
        setOrderValid(validateOrders(orders));
    }, [orders, setOrderValid]);

    return (
        <MuiDataGridCustomRowStyle
            columns={filteredColumns}
            columnTypes={{ hidden: { width: 0 } }}
            rows={orders}
            data={orders}
            getRowClassName={getRowClassName}
            onDoubleClick={onDoubleClick}
        />
    );
};

export default memo(OrderProductList);
