import React, { Suspense } from "react";

import { Navigate, Route, RouteProps, Routes } from "react-router-dom";
import Backdrop from "../../_cloner/components/Backdrop";
import ReadyToExit from "../modules/logestic/exit/ReadyToExit";
import LazyLoad from "../../_cloner/components/LazyLoad";
import Permissions from "../modules/access/permissions/Permissions";
import NotAcceess from "../../_cloner/components/NotAcceess";
import AccessDenied from "./AccessDenied";

const MasterLayout = React.lazy(() => import("../modules/layout/MasterLayout"));
const Customer = React.lazy(() => import("../modules/customer/Customer"));
const Products = React.lazy(() => import("../modules/product/Products"));
const Suppliers = React.lazy(() => import("../modules/product/Suppliers"));
const ProductPrice = React.lazy(
    () => import("../modules/product/ProductPrice")
);
const ReadyToCargo = React.lazy(
    () => import("../modules/logestic/cargo/ReadyToCargo")
);
const CargoList = React.lazy(
    () => import("../modules/logestic/cargo/CargoList")
);
const CargoForm = React.lazy(
    () => import("../modules/logestic/cargo/CargoForm")
);
const CargoEditForm = React.lazy(
    () => import("../modules/logestic/cargo/CargoEditForm")
);
const RecievePayment = React.lazy(
    () => import("../modules/payment/RecievePayment")
);
const PaymentAccounting = React.lazy(
    () => import("../modules/payment/PaymentAccounting")
);
const Detail = React.lazy(() => import("../modules/payment/components/Detail"));
const Order = React.lazy(() => import("../modules/order/Order"));
const SalesOrder = React.lazy(() => import("../modules/order/sales-order"));
const SalesOrderList = React.lazy(
    () => import("../modules/order/sales-order/Lists")
);
const SalesOrderEdit = React.lazy(
    () => import("../modules/order/sales-order/Edit")
);
const SalesOrderDetail = React.lazy(
    () => import("../modules/order/sales-order/Details")
);
const SalesOrderConfirm = React.lazy(
    () => import("../modules/order/sales-order/Confirm")
);
const ReadyToSalesOrderConfirm = React.lazy(
    () => import("../modules/order/sales-order/ReadyToConfirm")
);
const OrderList = React.lazy(() => import("../modules/order/OrderList"));
const OrderConfirm = React.lazy(() => import("../modules/order/OrderConfirm"));
const Dashboard = React.lazy(() => import("../modules/Dashboard"));
const DynamicBreadcrumbs = React.lazy(
    () => import("../../_cloner/components/Breadcumbs")
);
const Brands = React.lazy(() => import("../modules/generic/brands/Brands"));
const ProductTypes = React.lazy(
    () => import("../modules/generic/productType/ProductTypes")
);
const ProductState = React.lazy(
    () => import("../modules/generic/productState/ProductState")
);
const ProductStandards = React.lazy(
    () => import("../modules/generic/productStandard/ProductStandard")
);
const ProductBrands = React.lazy(
    () => import("../modules/generic/productBrands/ProductBrands")
);
const Users = React.lazy(() => import("../modules/user/Users"));
const UserForm = React.lazy(
    () => import("../modules/user/components/UserForm")
);
const RoleUser = React.lazy(
    () => import("../modules/user/components/RoleUser")
);
const ProductInventories = React.lazy(
    () => import("../modules/product/ProductInventories")
);
const OrderDetail = React.lazy(() => import("../modules/order/OrderDetail"));
const ProductForm = React.lazy(
    () => import("../modules/product/components/ProductForm")
);
const ProductService = React.lazy(
    () => import("../modules/generic/productService/ProductService")
);
const OrderConfirmList = React.lazy(
    () => import("../modules/order/OrderConfirmList")
);
const CargoPaper = React.lazy(
    () => import("../modules/logestic/cargo/CargoPaper")
);
const CustomerCompanies = React.lazy(
    () => import("../modules/generic/customerCompany/CustomerCompany")
);
const LadingLicence = React.lazy(
    () => import("../modules/logestic/lading/LadingLicence")
);
const LadingList = React.lazy(
    () => import("../modules/logestic/lading/LadingList")
);
const ReadyToLading = React.lazy(
    () => import("../modules/logestic/lading/ReadyToLading")
);
const OrderUpdate = React.lazy(() => import("../modules/order/OrderUpdate"));
const ExitRemittance = React.lazy(
    () => import("../modules/logestic/exit/ExitRemittance")
);
const ExitRemittanceList = React.lazy(
    () => import("../modules/logestic/exit/ReadyToExit")
);
const Roles = React.lazy(() => import("../modules/access/roles/Roles"));
const RoleMenu = React.lazy(() => import("../modules/access/roles/RoleMenu"));
const RoleGroups = React.lazy(() => import("../modules/access/groups/Groups"));
const GroupForm = React.lazy(
    () => import("../modules/access/groups/GroupForm")
);

export const routes: RouteProps[] = [
    { path: "auth/*", element: <Navigate to="/dashboard" /> },
    { path: "dashboard", element: <Dashboard /> },
    { path: "dashboard/order", element: <Order /> },
    { path: "dashboard/sales-order", element: <SalesOrder /> },
    { path: "dashboard/sales-order/lists", element: <SalesOrderList /> },
    { path: "dashboard/sales-order/lists/:id", element: <SalesOrderDetail /> },
    {
        path: "dashboard/sales-order/ready-to-confirm/:id",
        element: <SalesOrderConfirm />,
    },
    {
        path: "dashboard/sales-order/ready-to-confirm",
        element: <ReadyToSalesOrderConfirm />,
    },
    { path: "dashboard/sales-order/edit", element: <SalesOrderEdit /> },
    { path: "dashboard/orderUpdate", element: <OrderUpdate /> },
    { path: "dashboard/orderList", element: <OrderList /> },
    { path: "dashboard/approveOrderList", element: <OrderConfirmList /> },
    { path: "dashboard/orderList/:id", element: <OrderDetail /> },
    { path: "dashboard/approveOrderList/:id", element: <OrderConfirm /> },
    { path: "dashboard/customers", element: <Customer /> },
    { path: "dashboard/products", element: <Products /> },
    { path: "dashboard/suppliers", element: <Suppliers /> },
    { path: "dashboard/customerCompany", element: <CustomerCompanies /> },
    { path: "dashboard/productPrices", element: <ProductPrice /> },
    { path: "dashboard/cargoList", element: <CargoList /> },
    { path: "dashboard/cargoList/:id", element: <CargoEditForm /> },
    { path: "dashboard/order_ready_cargo", element: <ReadyToCargo /> },
    { path: "dashboard/order_ready_cargo/:id", element: <CargoForm /> },
    { path: "dashboard/cargoList/paper", element: <CargoPaper /> },
    { path: "dashboard/lading/:id", element: <LadingLicence /> },
    { path: "dashboard/ready_to_lading", element: <ReadyToLading /> },
    { path: "dashboard/ready_to_exit", element: <ReadyToExit /> },
    { path: "dashboard/exit/:id", element: <ExitRemittance /> },
    { path: "dashboard/lading_list", element: <LadingList /> },
    { path: "dashboard/exitRemittanceList", element: <ExitRemittanceList /> },
    { path: "dashboard/payment", element: <RecievePayment /> },
    { path: "dashboard/payment/accounting", element: <PaymentAccounting /> },
    { path: "dashboard/payment/accounting/:id", element: <Detail /> },
    { path: "dashboard/brands", element: <Brands /> },
    { path: "dashboard/productTypes", element: <ProductTypes /> },
    { path: "dashboard/productState", element: <ProductState /> },
    { path: "dashboard/productStandard", element: <ProductStandards /> },
    { path: "dashboard/productInventories", element: <ProductInventories /> },
    { path: "dashboard/productBrand", element: <ProductBrands /> },
    { path: "dashboard/productService", element: <ProductService /> },
    { path: "dashboard/users", element: <Users /> },
    { path: "dashboard/user/create", element: <UserForm /> },
    { path: "dashboard/user/role/:id", element: <RoleUser /> },
    { path: "dashboard/roles", element: <Roles /> },
    { path: "dashboard/roles/menu", element: <RoleMenu /> },
    { path: "dashboard/groups", element: <RoleGroups /> },
    { path: "dashboard/groups/form", element: <GroupForm /> },
    { path: "dashboard/permissions", element: <Permissions /> },
    { path: "dashboard/roles/menu", element: <RoleMenu /> },
    { path: "*", element: <Navigate to="/error/404" /> },

];

const PrivateRoutes = () => {
    return (
        <Routes>
            <Route element={<MasterLayout />}>
                <Route element={<DynamicBreadcrumbs />}>
                    {routes?.map((route) => (
                        <Route key={route.path} {...route} />
                    ))}
                </Route>
            </Route>
        </Routes>
    );
};

export { PrivateRoutes };
