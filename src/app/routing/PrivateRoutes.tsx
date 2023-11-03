import { Navigate, Route, Routes } from "react-router-dom";
import MasterLayout from "../modules/layout/MasterLayout";
import Customer from "../modules/customer/Customer";
import Products from "../modules/product/Products";
import Suppliers from "../modules/product/Suppliers";
import ProductPrice from "../modules/product/ProductPrice";
import Cargo from "../modules/cargo/Cargo";
import Confirm from "../modules/cargo/components/Confirm";
import RecievePayment from "../modules/payment/RecievePayment";
import PaymentAccounting from "../modules/payment/PaymentAccounting";
import Detail from "../modules/payment/components/Detail";
import Order from "../modules/order/Order";
import OrderList from "../modules/order/OrderList";
import OrderConfirm from "../modules/order/OrderConfirm";
import Dashboard from "../modules/Dashboard";
import DynamicBreadcrumbs from "../../_cloner/components/Breadcumbs";
import Brands from "../modules/generic/brands/Brands";
import ProductTypes from "../modules/generic/productType/ProductTypes";
import ProductState from "../modules/generic/productState/ProductState";
import ProductStandards from "../modules/generic/productStandard/ProductStandard";
import ProductBrands from "../modules/generic/productBrands/ProductBrands";
import Users from "../modules/user/Users";
import CreateUser from "../modules/user/components/CreateUser";
import RoleUser from "../modules/user/components/RoleUser";
import React from "react";
import ProductInventories from "../modules/product/ProductInventories";
import OrderDetail from "../modules/order/OrderDetail";
import ProductForm from "../modules/product/components/ProductForm";
import ProductService from "../modules/generic/productService/ProductService";

const PrivateRoutes = () => {

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route>
          <Route element={<DynamicBreadcrumbs />}>
            {/* Redirect to Dashboard after success login/registartion */}
            <Route path="auth/*" element={<Navigate to="/dashboard" />} />
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='dashboard/order' element={<Order />} />
            <Route path='dashboard/order/lists' element={<OrderList />} />
            <Route path='dashboard/order/confirm' element={<OrderConfirm />} />
            <Route path='dashboard/order/detail/:id' element={<OrderDetail data={undefined} isError={false} isLoading={false} />} />

            <Route path="dashboard/customers" element={<Customer />} />
            <Route path="dashboard/products" element={<Products />} />
            <Route path="dashboard/suppliers" element={<Suppliers />} />
            <Route path="dashboard/productPrices" element={<ProductPrice />} />
            <Route path='dashboard/cargo' element={<Cargo />} />
            <Route path='dashboard/cargo/confirm/:id' element={<Confirm />} />
            <Route path='dashboard/payment' element={<RecievePayment />} />
            <Route path='dashboard/payment/accounting' element={<PaymentAccounting />} />
            <Route path='dashboard/payment/accounting/:id' element={<Detail />} />
            {/* Brands */}
            <Route path='dashboard/brands' element={<Brands />} />
            <Route path='dashboard/productTypes' element={<ProductTypes />} />
            <Route path='dashboard/productState' element={<ProductState />} />
            <Route path='dashboard/productStandard' element={<ProductStandards />} />
            <Route path='dashboard/productInventories' element={<ProductInventories />} />
            <Route path='dashboard/productBrand' element={<ProductBrands />} />
            <Route path='dashboard/productService' element={<ProductService />} />

            <Route path='dashboard/users' element={<Users />} />
            <Route path="dashboard/user/create" element={<CreateUser />} />
            <Route path="dashboard/user/role/:id" element={<RoleUser />} />


            {/* Lazy Modules */}
            {/* Page Not Found */}
            <Route path="*" element={<Navigate to="/error/404" />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export { PrivateRoutes };
