import { useState, useRef, useEffect } from 'react'

import { Typography, IconButton } from '@mui/material'
import { Formik, FormikProps } from "formik"

import { orderPaymentValues, orderServiceValues, saleOrderEditInitialValues } from "./initialValues"

import ReusableCard from '../../../../_cloner/components/ReusableCard'
import OrderFeature from '../components/OrderFearure'
import OrderService from '../components/OrderService'
import OrderPayment from '../components/OrderPayment'

import { useGetPurchaserOrderDetailByCode, useUpdatePurchaserOrder } from '../core/_hooks'
import { IOrderItems, IOrderPayment, IOrderService } from '../core/_models'
import { calculateTotalAmount } from '../helpers/functions'
import Backdrop from '../../../../_cloner/components/Backdrop'
import CustomButton from '../../../../_cloner/components/CustomButton'
import { separateAmountWithCommas } from '../../../../_cloner/helpers/SeprateAmount'
import { sliceNumberPriceRial } from '../../../../_cloner/helpers/sliceNumberPrice'
import FormikInput from '../../../../_cloner/components/FormikInput'
import { SearchRounded } from '@mui/icons-material'
import { toAbsoulteUrl } from '../../../../_cloner/helpers/AssetsHelper'
import { useGetWarehouses } from '../../generic/_hooks'
import OrderProductDetail from './components/OrderProductDetail'
import { EnqueueSnackbar } from '../../../../_cloner/helpers/Snackebar'
import { renderAlert } from '../../../../_cloner/helpers/SweetAlert'
import { useGetProductList } from '../../generic/products/_hooks'
import FormikWarehouseBasedOfType from '../../../../_cloner/components/FormikWarehouseBasedOfType'

const PurchaserOrderEdit = () => {

  let formikRef = useRef<FormikProps<any>>(null);

  const [orders, setOrders] = useState<IOrderItems[]>([]); // OK
  const [orderPayment, setOrderPayment] = useState<IOrderPayment[]>([]); //OK
  const [orderServices, setOrderServices] = useState<IOrderService[]>([]); //OK

  const postSaleOrder = useUpdatePurchaserOrder();

  const products = useGetProductList();
  const detailTools = useGetPurchaserOrderDetailByCode()
  const warehouse = useGetWarehouses()


  useEffect(() => { 
    calculateTotalAmount(orders, orderServices)
     // eslint-disable-next-line 
  }, [orders, orderServices]);
  useEffect(() => {
    if (detailTools?.data?.data) {

      setOrderServices([
        ...detailTools?.data?.data?.orderServices?.map((i: any) => ({
          orderServiceMainId: i.id,
          serviceName: i?.serviceDesc,
          orderServiceId: i?.serviceId,
          orderServiceDescription: i?.description
        })) || []
      ]);

      setOrderPayment([
        ...detailTools?.data?.data?.orderPayments?.map((i: any) => ({
          orderPaymentId: i?.id,
          orderPaymentAmount: separateAmountWithCommas(+i.amount),
          orderPaymentDate: i.paymentDate,
          orderPaymentDaysAfterExit: i.daysAfterExit
        })) || []
      ]);

      setOrders([
        ...detailTools?.data?.data?.details?.map((i: any) => ({
          ...i,
          productId: i.productBrand.productId,
          productName: i.productBrand.product.productName,
          mainUnit: i.productBrand.product.productMainUnitDesc,
          productMainUnitDesc: i.productBrand.product.productMainUnitDesc,
          subUnit: i.productBrand.product.productSubUnitDesc,
          exchangeRate: +i.productBrand.product.exchangeRate,
          purchaseSettlementDate: i.deliverDate,
          purchasePrice: +i.purchasePrice,
          price: i.price,
          proximateAmount: separateAmountWithCommas(i.proximateAmount),
          productBrandName: i.productBrand.brandName,
          purchaserCustomerId: i.purchaserCustomerId,
          proximateSubUnit: Math.ceil(+i.proximateAmount / +i.productBrand.product.exchangeRate)
        })) || []
      ]);

    }
     // eslint-disable-next-line
  }, [detailTools?.data?.data])

  const onGetOrderDetailByCode = (e: React.ChangeEvent<HTMLInputElement>, orderCode: number) => {
    e.preventDefault()
    detailTools.mutate(orderCode, {
      onSuccess: () => {
        formikRef.current?.setFieldValue("searchOrderCode", 545)
      }
    })
  }

  const onSubmit = (values: any) => {
    if (orders?.length === 0) {
      EnqueueSnackbar("هیچ سفارشی در لیست سفارشات موجود نمی باشد.", "error")
    } else {
      const formData = {
        id: detailTools?.data?.data?.id,
        customerId: detailTools?.data?.data.customer.id, //ok
        totalAmount: calculateTotalAmount(orders, orderServices),
        description: values.description ? values.description : detailTools?.data?.data.description, //ok
        orderExitTypeId: values.exitType ? +values.exitType : detailTools?.data?.data.exitType, //ok
        purchaseOrderSendTypeId: values.purchaseOrderSendTypeId ? +values.purchaseOrderSendTypeId : detailTools?.data?.data.orderSendTypeId ,
        paymentTypeId: values.paymentTypeId ? +values.paymentTypeId : detailTools?.data?.data.purchaseOrderSendTypeId, //ok
        productBrandId: 40,
        originWarehouseId: values.originWarehouseId ? +values.originWarehouseId : detailTools?.data?.data?.originWarehouseId,
        destinationWarehouseId: values.destinationWarehouseId ? values.destinationWarehouseId : detailTools?.data?.data?.destinationWarehouseId,
        customerOfficialCompanyId: values.customerOfficialCompanyId ? +values.customerOfficialCompanyId : null, //NOTOK
        invoiceTypeId: values.invoiceTypeId ? values.invoiceTypeId : detailTools?.data?.data.invoiceTypeId, //ok
        isTemporary: values.isTemorary && values.isTemporary === 1 ? false : values.isTemporary === 2 ? true : detailTools?.data?.data.isTemporary,
        details: orders?.map((item: any) => {
          const orderDetails: any = {
            rowId: item.rowId ? +item.rowId : 0,
            productId: item.id,
            productBrandId: item.productBrandId ? +item.productBrandId : 40,
            proximateAmount: item.proximateAmount ? +item.proximateAmount?.replace(/,/g, "") : 0,
            productSubUnitAmount: item.proximateSubUnit ? +item.proximateSubUnit : 0,
            productSubUnitId: item.productSubUnitId ? +item.productSubUnitId : null,
            numberInPackage: item.numberInPackage ? +item.numberInPackage : 0,
            price: typeof item.price === "number" ? item.price : +item.price?.replace(/,/g, ""),
            description: item.description,
            deliverDate: item.purchaseSettlementDate ? item.purchaseSettlementDate : item.deliverDate,
          };

          // Conditionally include id if it exists
          if (Number.isInteger(item.id)) {
            orderDetails.id = item.id;
          }

          return orderDetails;
        }),
        orderPayments: orderPayment?.map((item: IOrderPayment) => {
          return {
            id: item.orderPaymentId ? item.orderPaymentId : null,
            amount: item.orderPaymentAmount && +(item.orderPaymentAmount.replace(/,/g, "")),
            paymentDate: item.orderPaymentDate,
            daysAfterExit: item.orderPaymentDaysAfterExit ? +item.orderPaymentDaysAfterExit : 0,
            paymentType: item.orderPaymentType
          }
        }),
        orderServices: orderServices.map((item: IOrderService) => {
          return {
            id: item.orderServiceMainId ? item.orderServiceMainId : null,
            serviceId: item.orderServiceId,
            description: item.orderServiceDescription
          }
        }) //ok
      };
      console.log(formData)
      try {
        postSaleOrder.mutate(formData, {
          onSuccess: (response) => {
            if (response.data.Errors && response.data.Errors.length > 0) {
              response.data.Errors.forEach((item: any) => {
                EnqueueSnackbar(item, "error")
              })
            } else {
              if (response.succeeded) {
                renderAlert("سفارش با موفقیت ویرایش گردید")
              } else {
                EnqueueSnackbar(response?.data.Message, "error")
              }
            }
          }
        });
      } catch (error) {
        EnqueueSnackbar("خطای در ثبت، لطفا با پشتیبان تماس بگیرید", "error")
      }
    }
  }
  return (
    <>
      {detailTools.isLoading && <Backdrop loading={detailTools.isLoading} />}
      {postSaleOrder.isLoading && <Backdrop loading={postSaleOrder.isLoading} />}
      <Formik enableReinitialize innerRef={formikRef} initialValues={{
        ...saleOrderEditInitialValues,
        ...orderPaymentValues,
        ...orderServiceValues,
        ...detailTools?.data?.data,
        paymentTypeId: detailTools?.data?.data.farePaymentTypeId,
        destinationWarehouseId: detailTools?.data?.data.destinationWarehouseId,
        purchaseOrderSendTypeId: detailTools?.data?.data.orderSendTypeId,
        isTemporary: !detailTools?.data?.data.isTemporary ? 1 : 2
      }} onSubmit={onSubmit}>
        {({ values, setFieldValue, handleSubmit }) => {
          return <>
            {/*The design of the header section of the order module includes order information and customer information */}
            <div className="grid grid-cols-1 md:grid-cols-8 md:space-y-0 space-y-4 gap-x-4 my-4">
              <ReusableCard cardClassName="col-span-2">
                {!postSaleOrder?.data?.succeeded &&
                  <form onSubmit={(e: any) => onGetOrderDetailByCode(e, values.searchOrderCode)} className="flex mt-4 gap-4">
                    <FormikInput label="شماره سفارش" name="searchOrderCode" />
                    <IconButton type="submit">
                      <SearchRounded color="secondary" />
                    </IconButton>
                  </form>
                }
                <div className="mt-8 space-y-8">
                  <div className="flex justify-between">
                    <Typography variant="h4" className="text-gray-500">شماره سفارش</Typography>
                    <Typography variant="h3">
                      {detailTools?.data?.data.orderCode ? detailTools?.data?.data.orderCode : "------------------"}
                    </Typography>
                  </div>
                  <div className="flex justify-between">
                    <Typography variant="h4" className="text-gray-500">مشتری</Typography>
                    <Typography variant="h3">
                      {detailTools?.data?.data.customerName ? detailTools?.data?.data.customerName : "------------------"}
                    </Typography>
                  </div>
                  <div className="flex justify-between">
                    <Typography variant="h4" className="text-gray-500">تاریخ سفارش</Typography>
                    <Typography variant="h3">
                      {detailTools?.data?.data?.registerDate ? detailTools?.data?.data.registerDate : "------------------"}
                    </Typography>
                  </div>
                  <div className="flex justify-between">
                    <Typography variant="h4" className="text-gray-500">قیمت کل</Typography>
                    <Typography variant="h3" className="text-green-500">
                      {sliceNumberPriceRial(calculateTotalAmount(orders, orderServices))} ریال
                    </Typography>
                  </div>
                </div>
              </ReusableCard>
              <div className='col-span-3'>
                <OrderFeature categories={[]} isPurchaser={true} postOrder={postSaleOrder} />
              </div>
              <ReusableCard cardClassName="col-span-3 flex items-center justify-center">
                <img alt="sepehriranian" src={toAbsoulteUrl('/media/logos/3610632.jpg')} width={300} />
              </ReusableCard>
            </div>
            {/*The design of the main section of the order module order */}
            <div className='grid grid-cols-1 lg:grid-cols-4 gap-y-4 lg:gap-4  mt-4'>
              <ReusableCard cardClassName='lg:col-span-3'>
                <OrderProductDetail
                  setFieldValue={setFieldValue}
                  values={values}
                  postSaleOrder={postSaleOrder}
                  products={products}
                  orders={orders}
                  setOrders={setOrders}
                  orderPayment={orderPayment}
                  setOrderPayment={setOrderPayment}
                  orderServices={orderServices}
                  setOrderServices={setOrderServices}
                  formikRef={formikRef}
                />
              </ReusableCard>
              <ReusableCard>
                <Typography variant="h2">انبار مبدا و مقصد</Typography>
                <div className="flex flex-col space-y-4 mt-8">
                  <FormikWarehouseBasedOfType
                    name="originWarehouseId"
                    label="انبار مبدا"
                    warehouse={warehouse?.data?.filter((item: { warehouseTypeId: number }) => item.warehouseTypeId === 4)}
                  />
                  <FormikWarehouseBasedOfType name="destinationWarehouseId" label="انبار مقصد" warehouse={warehouse?.data} />
                </div>
              </ReusableCard>
            </div>
            <div className="md:grid md:grid-cols-2 gap-x-4 mt-4">
              <OrderService
                orderService={orderServices}
                setOrderService={setOrderServices}
                setOrderPayment={setOrderPayment}
                formikRef={formikRef}
                postSaleOrder={postSaleOrder}
                orders={orders} />
              <OrderPayment
                orderPayment={orderPayment}
                orderService={orderServices}
                postSaleOrder={postSaleOrder}
                orders={orders}
                formikRef={formikRef}
                setOrderPayment={setOrderPayment} />
            </div>
            <div
              className="flex gap-x-8 my-4 justify-center items-center md:justify-end md:items-end"
            >
              <CustomButton
                title={postSaleOrder.isLoading ? "در حال پردازش ...." : "ویرایش سفارش فروش"}
                disabled={
                  orders.length <= 0 ||
                  postSaleOrder.isLoading ||
                  orderPayment.length <= 0 ||
                  postSaleOrder?.data?.succeeded === ""
              }
                onClick={() => handleSubmit()}
                color="primary"
                isLoading={postSaleOrder.isLoading}
              />
            </div>

          </>
        }}
      </Formik>
    </>
  )
}

export default PurchaserOrderEdit
