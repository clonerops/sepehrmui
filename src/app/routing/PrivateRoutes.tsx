import React, { Suspense } from 'react'

import { Navigate, Route, Routes } from "react-router-dom";
import Backdrop from '../../_cloner/components/Backdrop';
import ReadyToExit from '../modules/logestic/exit/ReadyToExit';
import LazyLoad from '../../_cloner/components/LazyLoad';
import Permissions from '../modules/access/permissions/Permissions';

const MasterLayout = React.lazy(() => import("../modules/layout/MasterLayout"));
const Customer = React.lazy(() => import("../modules/customer/Customer"));
const Products = React.lazy(() => import("../modules/product/Products"));
const Suppliers = React.lazy(() => import("../modules/product/Suppliers"));
const ProductPrice = React.lazy(() => import("../modules/product/ProductPrice"));
const ReadyToCargo = React.lazy(() => import("../modules/logestic/cargo/ReadyToCargo"));
const CargoList = React.lazy(() => import("../modules/logestic/cargo/CargoList"));
const CargoForm = React.lazy(() => import("../modules/logestic/cargo/CargoForm"));
const CargoEditForm = React.lazy(() => import("../modules/logestic/cargo/CargoEditForm"));
const RecievePayment = React.lazy(() => import("../modules/payment/RecievePayment"));
const PaymentAccounting = React.lazy(() => import("../modules/payment/PaymentAccounting"));
const Detail = React.lazy(() => import("../modules/payment/components/Detail"));
const Order = React.lazy(() => import("../modules/order/Order"));
const SalesOrder = React.lazy(() => import("../modules/order/sales-order"));
const SalesOrderList = React.lazy(() => import("../modules/order/sales-order/Lists"));
const SalesOrderEdit = React.lazy(() => import("../modules/order/sales-order/Edit"));
const SalesOrderDetail = React.lazy(() => import("../modules/order/sales-order/Details"));
const SalesOrderConfirm = React.lazy(() => import("../modules/order/sales-order/Confirm"));
const ReadyToSalesOrderConfirm = React.lazy(() => import("../modules/order/sales-order/ReadyToConfirm"));
const OrderList = React.lazy(() => import("../modules/order/OrderList"));
const OrderConfirm = React.lazy(() => import("../modules/order/OrderConfirm"));
const Dashboard = React.lazy(() => import("../modules/Dashboard"));
const DynamicBreadcrumbs = React.lazy(() => import("../../_cloner/components/Breadcumbs"));
const Brands = React.lazy(() => import("../modules/generic/brands/Brands"));
const ProductTypes = React.lazy(() => import("../modules/generic/productType/ProductTypes"));
const ProductState = React.lazy(() => import("../modules/generic/productState/ProductState"));
const ProductStandards = React.lazy(() => import("../modules/generic/productStandard/ProductStandard"));
const ProductBrands = React.lazy(() => import("../modules/generic/productBrands/ProductBrands"));
const Users = React.lazy(() => import("../modules/user/Users"));
const UserForm = React.lazy(() => import("../modules/user/components/UserForm"));
const RoleUser = React.lazy(() => import("../modules/user/components/RoleUser"));
const ProductInventories = React.lazy(() => import("../modules/product/ProductInventories"));
const OrderDetail = React.lazy(() => import("../modules/order/OrderDetail"));
const ProductForm = React.lazy(() => import("../modules/product/components/ProductForm"));
const ProductService = React.lazy(() => import("../modules/generic/productService/ProductService"));
const OrderConfirmList = React.lazy(() => import("../modules/order/OrderConfirmList"));
const CargoPaper = React.lazy(() => import("../modules/logestic/cargo/CargoPaper"));
const CustomerCompanies = React.lazy(() => import("../modules/generic/customerCompany/CustomerCompany"));
const LadingLicence = React.lazy(() => import("../modules/logestic/lading/LadingLicence"));
const LadingList = React.lazy(() => import("../modules/logestic/lading/LadingList"));
const ReadyToLading = React.lazy(() => import("../modules/logestic/lading/ReadyToLading"));
const OrderUpdate = React.lazy(() => import("../modules/order/OrderUpdate"));
const ExitRemittance = React.lazy(() => import("../modules/logestic/exit/ExitRemittance"));
const ExitRemittanceList = React.lazy(() => import("../modules/logestic/exit/ReadyToExit"));
const Roles = React.lazy(() => import("../modules/access/roles/Roles"));
const RoleMenu = React.lazy(() => import("../modules/access/roles/RoleMenu"));
const RoleGroups = React.lazy(() => import("../modules/access/groups/Groups"));
const GroupForm = React.lazy(() => import("../modules/access/groups/GroupForm"));

const PrivateRoutes = () => {

  return (
    <Suspense fallback={<LazyLoad loading={true} />}>
      <Routes>
        <Route element={<MasterLayout />}>
          <Route>
            <Route element={<DynamicBreadcrumbs />}>
              {/* Redirect to Dashboard after success login/registartion */}
              <Route path="auth/*" element={<Navigate to="/dashboard" />} />
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='dashboard/order' element={<Order />} />

              <Route path='dashboard/sales-order' element={<SalesOrder />} />
              <Route path='dashboard/sales-order/lists' element={<SalesOrderList />} />
              <Route path='dashboard/sales-order/lists/:id' element={<SalesOrderDetail />} />
              <Route path='dashboard/sales-order/ready-to-confirm/:id' element={<SalesOrderConfirm />} />
              <Route path='dashboard/sales-order/ready-to-confirm' element={<ReadyToSalesOrderConfirm />} />
              <Route path='dashboard/sales-order/edit' element={<SalesOrderEdit />} />
              {/* <Route path='dashboard/order/:id' element={<Order />} /> */}
              <Route path='dashboard/orderUpdate' element={<OrderUpdate />} />
              <Route path='dashboard/orderList' element={<OrderList />} />
              <Route path='dashboard/approveOrderList' element={<OrderConfirmList />} />
              <Route path='dashboard/orderList/:id' element={<OrderDetail />} />
              <Route path='dashboard/approveOrderList/:id' element={<OrderConfirm />} />

              <Route path="dashboard/customers" element={<Customer />} />
              <Route path="dashboard/products" element={<Products />} />
              <Route path="dashboard/suppliers" element={<Suppliers />} />
              <Route path="dashboard/customerCompany" element={<CustomerCompanies />} />
              <Route path="dashboard/productPrices" element={<ProductPrice />} />
              <Route path='dashboard/cargoList' element={<CargoList />} />
              <Route path='dashboard/cargoList/:id' element={<CargoEditForm />} />
              <Route path='dashboard/order_ready_cargo' element={<ReadyToCargo />} />
              <Route path='dashboard/order_ready_cargo/:id' element={<CargoForm />} />
              <Route path='dashboard/cargoList/paper' element={<CargoPaper />} />
              <Route path='dashboard/lading/:id' element={<LadingLicence />} />
              <Route path='dashboard/ready_to_lading' element={<ReadyToLading />} />
              <Route path='dashboard/ready_to_exit' element={<ReadyToExit />} />
              <Route path='dashboard/exit/:id' element={<ExitRemittance />} />
              <Route path='dashboard/lading_list' element={<LadingList />} />
              <Route path='dashboard/exitRemittanceList' element={<ExitRemittanceList />} />
              <Route path='dashboard/payment' element={<RecievePayment />} />
              <Route path='dashboard/payment/accounting' element={<PaymentAccounting />} />
              <Route path='dashboard/payment/accounting/:id' element={<Detail />} />
              {/* Brands */}
              <Route path='dashboard/brands' element={<Brands />} />
              <Route path='dashboard/productTypes' element={<ProductTypes />} />
              <Route path='dashboard/productState' element={<ProductState />} />
              <Route path='dashboard/productStandard' element={<ProductStandards />} />
              <Route path='dashboard/productInventories' element={< ProductInventories />} />
              <Route path='dashboard/productBrand' element={<ProductBrands />} />
              <Route path='dashboard/productService' element={<ProductService />} />

              <Route path='dashboard/users' element={<Users />} />
              <Route path="dashboard/user/create" element={<UserForm />} />
              <Route path="dashboard/user/role/:id" element={<RoleUser />} />

            {/* Roles */}
            <Route path="dashboard/roles" element={<Roles />} />
            <Route path="dashboard/roles/menu" element={<RoleMenu />} />
            <Route path="dashboard/roles/groups" element={<RoleGroups />} />
            <Route path="dashboard/roles/groups/form" element={<GroupForm />} />
            <Route path="dashboard/permissions" element={<Permissions />} />
            <Route path="dashboard/roles/menu" element={<RoleMenu />} />



              {/* Lazy (M => import(""))odules */}
              {/* Page Not Found */}
              <Route path="*" element={<Navigate to="/error/404" />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export { PrivateRoutes };
