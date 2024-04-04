import React from "react";

import { Navigate, Route, RouteProps, Routes } from "react-router-dom";

const MasterLayout = React.lazy(() => import("../modules/layout/MasterLayout"));
const Customer = React.lazy(() => import("../modules/customer/Customer"));
const Banks = React.lazy(() => import("../modules/generic/bank/Banks"));
const Shareholders = React.lazy(() => import("../modules/generic/shareHolders/Shareholders"));
const Funds = React.lazy(() => import("../modules/generic/fund/Funds"));
const CashDesks = React.lazy(() => import("../modules/generic/cashDesk/CashDesk"));
const InComs = React.lazy(() => import("../modules/generic/inCome/InCome"));
const Costs = React.lazy(() => import("../modules/generic/cost/Cost"));
const Products = React.lazy(() => import("../modules/generic/products/Products"));
const Suppliers = React.lazy(() => import("../modules/generic/productSuppliers/Suppliers"));
const ReadyToExit = React.lazy(
    () => import("../modules/logestic/exit/ReadyToExit")
);
const Permissions = React.lazy(
    () => import("../modules/access/permissions/Permissions")
);
const TransferRemitancesList = React.lazy(
    () => import("../modules/logestic/entrance/TransferRemittancesList")
);
const TransferRemittanceDetails = React.lazy(
    () => import("../modules/logestic/entrance/TransferRemittanceDetails")
);
const BilllandingEdit = React.lazy(
    () => import("../modules/logestic/billlanding/BilllandingEdit")
);
const EntranceList = React.lazy(
    () => import("../modules/logestic/entrance/EntranceList")
);
const EntranceLading = React.lazy(
    () => import("../modules/logestic/entrance/EntranceLading")
);
const ReadyToEvacuation = React.lazy(
    () => import("../modules/logestic/evacuation/ReadyToEvacuation")
);
const EvacuationPermit = React.lazy(
    () => import("../modules/logestic/evacuation/EvacuationPermit")
);
const RecievePaymentEdit = React.lazy(
    () => import("../modules/payment/RecievePaymentEdit")
);
const EntranceReport = React.lazy(
    () => import("../modules/report/EntranceReport")
);
const LadingReport = React.lazy(
    () => import("../modules/report/LadingReport")
);
const PaymentAccountingRegister = React.lazy(
    () => import("../modules/payment/PaymentAccountingRegister")
);
const SinglePaymentRegister = React.lazy(
    () => import("../modules/payment/components/SinglePaymentRegister")
);
const Billlanding = React.lazy(
    () => import("../modules/logestic/billlanding/Billlanding")
);
const ListOfBilllanding = React.lazy(
    () => import("../modules/logestic/billlanding/ListOfBilllanding")
);
const BilllandingDetails = React.lazy(
    () => import("../modules/logestic/billlanding/BilllandingDetails")
);
const ProductPrice = React.lazy(
    () => import("../modules/generic/productPrices/ProductPrice")
);
const ReadyToCargo = React.lazy(
    () => import("../modules/logestic/cargo/ReadyToCargo")
);
const CustomerWarehouse = React.lazy(
    () => import("../modules/generic/customerWarehouse/CustomerWarehouse")
);

const CargoList = React.lazy(
    () => import("../modules/logestic/cargo/CargoList")
);
const CargoForm = React.lazy(
    () => import("../modules/logestic/cargo/CargoForm")
);
const TransferBetweenWarehouse = React.lazy(
    () => import("../modules/generic/warehouse/TransferBetweenWarehouse")
);
const TransferBetweenWarehouseAction = React.lazy(
    () => import("../modules/generic/warehouse/TransferBetweenWarehouseAction")
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
const SalesOrder = React.lazy(() => import("../modules/managment-order/sales-order"));
const PurchaserOrder = React.lazy(() => import("../modules/managment-order/purchaser-order"));
const SalesOrderList = React.lazy(
    () => import("../modules/managment-order/sales-order/Lists")
);
const PreSaleLists = React.lazy(
    () => import("../modules/managment-order/sales-order/PreSaleLists")
);
const PurchaserOrderList = React.lazy(
    () => import("../modules/managment-order/purchaser-order/Lists")
);
const SalesOrderEdit = React.lazy(
    () => import("../modules/managment-order/sales-order/Edit")
);
const PurchaserOrderEdit = React.lazy(
    () => import("../modules/managment-order/purchaser-order/Edit")
);
const SalesOrderDetail = React.lazy(
    () => import("../modules/managment-order/sales-order/Details")
);
const ConvertPreSaleToUrgentSale = React.lazy(
    () => import("../modules/managment-order/sales-order/ConvertPreSaleToUrgentSale")
);
const PurchaserOrderDetail = React.lazy(
    () => import("../modules/managment-order/purchaser-order/Details")
);
const SalesOrderConfirm = React.lazy(
    () => import("../modules/managment-order/sales-order/Confirm")
);
const PurchaserOrderConfirm = React.lazy(
    () => import("../modules/managment-order/purchaser-order/Confirm")
);
const ReadyToSalesOrderConfirm = React.lazy(
    () => import("../modules/managment-order/sales-order/ReadyToConfirm")
);
const ReadyToPurchaserOrderConfirm = React.lazy(
    () => import("../modules/managment-order/purchaser-order/ReadyToConfirm")
);
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
const Warehouse = React.lazy(
    () => import("../modules/generic/warehouse/Warehouse")
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
    () => import("../modules/generic/productInventories/productInventory/ProductInventories")
);
const ProductInventoriesSepehr = React.lazy(
    () => import("../modules/generic/productInventories/productInventorySepehr/ProductInventories")
);
const ProductService = React.lazy(
    () => import("../modules/generic/productService/ProductService")
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
const ExitRemittance = React.lazy(
    () => import("../modules/logestic/exit/ExitRemittance")
);
const ExitRemittanceList = React.lazy(
    () => import("../modules/logestic/exit/ReadyToExit")
);
const Roles = React.lazy(() => import("../modules/access/roles/Roles"));
const RoleMenu = React.lazy(() => import("../modules/access/roles/RoleMenu"));
const RoleGroups = React.lazy(() => import("../modules/access/groups/Groups"));
// const GroupForm = React.lazy(
//     () => import("../modules/access/groups/GroupForm")
// );

export const routes: RouteProps[] = [
    { path: "auth/*", element: <Navigate to="/dashboard" /> },
    { path: "dashboard", element: <Dashboard /> },
    { path: "dashboard/sales_order", element: <SalesOrder /> },
    { path: "dashboard/purchaser_order", element: <PurchaserOrder /> },
    { path: "dashboard/sales_order/lists", element: <SalesOrderList /> },
    { path: "dashboard/sales_order/presale", element: <PreSaleLists /> },
    { path: "dashboard/purchaser_order/lists", element: <PurchaserOrderList /> },
    { path: "dashboard/sales_order/lists/:id", element: <SalesOrderDetail /> },
    { path: "dashboard/sales_order/presale-to-urgentsale/:id", element: <ConvertPreSaleToUrgentSale /> },
    { path: "dashboard/purchaser_order/lists/:id", element: <PurchaserOrderDetail /> },
    {
        path: "dashboard/sales_order/ready-to-confirm/:id",
        element: <SalesOrderConfirm />,
    },
    {
        path: "dashboard/purchaser_order/ready-to-confirm/:id",
        element: <PurchaserOrderConfirm />,
    },
    {
        path: "dashboard/sales_order/ready-to-confirm",
        element: <ReadyToSalesOrderConfirm />,
    },
    {
        path: "dashboard/purchaser_order/ready-to-confirm",
        element: <ReadyToPurchaserOrderConfirm />,
    },
    { path: "dashboard/sales_order/edit", element: <SalesOrderEdit /> },
    { path: "dashboard/purchaser_order/edit", element: <PurchaserOrderEdit /> },
    { path: "dashboard/customers", element: <Customer /> },
    { path: "dashboard/products", element: <Products /> },
    { path: "dashboard/banks", element: <Banks /> },
    { path: "dashboard/shareholders", element: <Shareholders /> },
    { path: "dashboard/funds", element: <Funds /> },
    { path: "dashboard/cashDesk", element: <CashDesks /> },
    { path: "dashboard/income", element: <InComs /> },
    { path: "dashboard/cost", element: <Costs /> },
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
    { path: "dashboard/ladingReport", element: <LadingReport /> },
    { path: "dashboard/lading_list", element: <LadingList /> },
    { path: "dashboard/exitRemittanceList", element: <ExitRemittanceList /> },
    { path: "dashboard/payment", element: <RecievePayment /> },
    { path: "dashboard/payment/accounting", element: <PaymentAccounting /> },
    { path: "dashboard/payment/accounting/register", element: <PaymentAccountingRegister /> },
    { path: "dashboard/payment/accounting/:id", element: <Detail /> },
    { path: "dashboard/payment/accounting/register/:id", element: <SinglePaymentRegister /> },
    { path: "dashboard/payment/edit/:id", element: <RecievePaymentEdit /> },
    { path: "dashboard/brands", element: <Brands /> },
    { path: "dashboard/productTypes", element: <ProductTypes /> },
    { path: "dashboard/customerWarehouse", element: <CustomerWarehouse /> },
    { path: "dashboard/productState", element: <ProductState /> },
    { path: "dashboard/productStandard", element: <ProductStandards /> },
    { path: "dashboard/warehouses", element: <Warehouse /> },
    { path: "dashboard/productInventories", element: <ProductInventories /> },
    { path: "dashboard/productInventoriesSepehr", element: <ProductInventoriesSepehr /> },
    { path: "dashboard/productBrand", element: <ProductBrands /> },
    { path: "dashboard/productService", element: <ProductService /> },
    { path: "dashboard/transferBetweenWarehouse", element: <TransferBetweenWarehouse /> },
    { path: "dashboard/transferBetweenWarehouse/:id", element: <TransferBetweenWarehouseAction /> },
    { path: "dashboard/billlanding", element: <Billlanding /> },
    { path: "dashboard/billlandingEdit/:id", element: <BilllandingEdit /> },
    { path: "dashboard/billlandingList", element: <ListOfBilllanding /> },
    { path: "dashboard/billlandingList/:id", element: <BilllandingDetails /> },
    { path: "dashboard/transferRemittance", element: <TransferRemitancesList /> },
    { path: "dashboard/transferRemittance", element: <TransferRemitancesList /> },
    { path: "dashboard/transferRemittance/:id", element: <TransferRemittanceDetails /> },
    { path: "dashboard/entranceList", element: <EntranceList /> },
    { path: "dashboard/entranceReport", element: <EntranceReport /> },
    { path: "dashboard/entranceLading", element: <EntranceLading /> },
    { path: "dashboard/ready_to_evacuation", element: <ReadyToEvacuation /> },

    { path: "dashboard/evacuation/:id/:entranceId", element: <EvacuationPermit /> },
    { path: "dashboard/evacuation", element: <EvacuationPermit /> },

    { path: "dashboard/users", element: <Users /> },
    { path: "dashboard/user/create", element: <UserForm /> },
    { path: "dashboard/user/role/:id", element: <RoleUser /> },
    { path: "dashboard/roles", element: <Roles /> },
    { path: "dashboard/roles/menu", element: <RoleMenu /> },
    { path: "dashboard/groups", element: <RoleGroups /> },
    // { path: "dashboard/groups/form", element: <GroupForm /> },
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
