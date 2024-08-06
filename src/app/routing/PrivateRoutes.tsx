import React from "react";

import { Navigate, Route, RouteProps, Routes } from "react-router-dom";
import RentPrint from "../modules/prints/RentPrint";
import LadingPermitPrint from "../modules/prints/LadingPermitPrint";
import ExitRemiitanceEdit from "../modules/exitRemittance/ExitRemittanceEdit";
import LadingExitPermitPrint from "../modules/prints/LadingExitPermitPrint";
import ApprovedRentPayment from "../modules/exitRemittance/ApprovedRentPayment";
import LadingExitPermitPrintOfficial from "../modules/prints/LadingExitPermitPrintOfficial";
import InvoiceOfficial from "../modules/prints/InvoiceOfficial";
import InvoiceNotOfficial from "../modules/prints/InvoiceNotOfficial";
import CustomerLabels from "../modules/customerLabel/CustomerLabel";
import ExitDetail from "../modules/exitRemittance/ExitDetail";
import CargoDetail from "../modules/cargoAnnouncment/CargoDetail";
import TrasnferRemittanceDetails from "../modules/transferRemittance/TransferRemittanceDetails";
import { PaymentAccountingRegisterListColumn } from "../../_cloner/helpers/columns";
import PaymentAccountingRegisterList from "../modules/payment/PaymentAccountingRegisterList";
import EvacutionPrint from "../modules/prints/EvacutionPrint";
import EntrancePermit from "../modules/entrancePermit/EntrancePermit";
import TransferBetweenWarehouse from "../modules/warehouse/TransferBetweenWarehouse";

const MasterLayout = React.lazy(() => import("../modules/layout/MasterLayout"));
const OrganizationBank = React.lazy(() => import("../modules/organizationBank/OrganizationBank"));
const ExitList = React.lazy(() => import("../modules/exitRemittance/ExitList"));
const ReadyToRent = React.lazy(() => import("../modules/rent-payment/ReadyToRent"));
const RentPaymentList = React.lazy(() => import("../modules/rent-payment/RentPaymentList"));
const Customer = React.lazy(() => import("../modules/customer/Customer"));
const Shareholders = React.lazy(() => import("../modules/shareHolders/Shareholders"));
const PettyCashs = React.lazy(() => import("../modules/pettyCash/PettyCashes"));
const CashDesks = React.lazy(() => import("../modules/cashDesk/CashDesk"));
const InComs = React.lazy(() => import("../modules/inCome/InCome"));
const Costs = React.lazy(() => import("../modules/cost/Cost"));
const Products = React.lazy(() => import("../modules/products/Products"));
const Suppliers = React.lazy(() => import("../modules/productSuppliers/Suppliers"));
const ReadyToExit = React.lazy(
    () => import("../modules/exitRemittance/ReadyToExit")
);
const Permissions = React.lazy(
    () => import("../modules/permissions/Permissions")
);
const TransferRemitancesList = React.lazy(
    () => import("../modules/entrancePermit/ReadyToEntrance")
);
const BilllandingEdit = React.lazy(
    () => import("../modules/transferRemittance/TransferRemittanceEdit")
);
const EntranceList = React.lazy(
    () => import("../modules/entrancePermit/EntranceList")
);
const ReadyToEvacuation = React.lazy(
    () => import("../modules/evacuation/ReadyToEvacuation")
);
const EvacuationPermit = React.lazy(
    () => import("../modules/evacuation/EvacuationPermit")
);
const RecievePaymentEdit = React.lazy(
    () => import("../modules/payment/RecievePaymentEdit")
);
const EntranceReport = React.lazy(
    () => import("../modules/report/EntranceReport")
);
// const LadingReport = React.lazy(
//     () => import("../modules/report/LadingReport")
// );
const PaymentAccountingRegister = React.lazy(
    () => import("../modules/payment/PaymentAccountingRegister")
);
const SinglePaymentRegister = React.lazy(
    () => import("../modules/payment/components/SinglePaymentRegister")
);
const Billlanding = React.lazy(
    () => import("../modules/transferRemittance/TransferRemittance")
);
const ListOfBilllanding = React.lazy(
    () => import("../modules/transferRemittance/ListOfTransferRemittance")
);
const BilllandingDetails = React.lazy(
    () => import("../modules/transferRemittance/TransferRemittanceDetails")
);
const ProductPrice = React.lazy(
    () => import("../modules/productPrices/ProductPrice")
);
const ReadyToCargo = React.lazy(
    () => import("../modules/cargoAnnouncment/ReadyToCargo")
);
const CustomerWarehouse = React.lazy(
    () => import("../modules/customerWarehouse/CustomerWarehouse")
);

const CargoList = React.lazy(
    () => import("../modules/cargoAnnouncment/CargoList")
);
const CargoForm = React.lazy(
    () => import("../modules/cargoAnnouncment/CargoForm")
);
const CargoEditForm = React.lazy(
    () => import("../modules/cargoAnnouncment/CargoEditForm")
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
const Brands = React.lazy(() => import("../modules/brands/Brands"));
const ProductTypes = React.lazy(
    () => import("../modules/productType/ProductTypes")
);
const ProductState = React.lazy(
    () => import("../modules/productState/ProductState")
);
const ProductStandards = React.lazy(
    () => import("../modules/productStandard/ProductStandard")
);
const Warehouse = React.lazy(
    () => import("../modules/warehouse/Warehouse")
);
const ProductBrands = React.lazy(
    () => import("../modules/productBrands/ProductBrands")
);
const Users = React.lazy(() => import("../modules/user/Users"));
const UserForm = React.lazy(
    () => import("../modules/user/components/UserForm")
);
const RoleUser = React.lazy(
    () => import("../modules/user/components/RoleUser")
);
const ProductInventories = React.lazy(
    () => import("../modules/productInventories/productInventory/ProductInventories")
);
const ProductInventoriesSepehr = React.lazy(
    () => import("../modules/productInventories/productInventorySepehr/ProductInventories")
);
const ProductService = React.lazy(
    () => import("../modules/productService/ProductService")
);
const CustomerCompanies = React.lazy(
    () => import("../modules/customerCompany/CustomerCompany")
);
const LadingPermit = React.lazy(
    () => import("../modules/ladingLicence/LadingLicence")
);
const LadingList = React.lazy(
    () => import("../modules/ladingLicence/LadingList")
);
const ReadyToLading = React.lazy(
    () => import("../modules/ladingLicence/ReadyToLading")
);
const ExitRemittance = React.lazy(
    () => import("../modules/exitRemittance/ExitRemittance")
);
const ExitRemittanceList = React.lazy(
    () => import("../modules/exitRemittance/ReadyToExit")
);
const Roles = React.lazy(() => import("../modules/role/Roles"));
const RoleGroups = React.lazy(() => import("../modules/groups/Groups"));
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
        path: "dashboard/sales_order/ready_to_confirm/:id",
        element: <SalesOrderConfirm />,
    },
    {
        path: "dashboard/purchaser_order/ready_to_confirm/:id",
        element: <PurchaserOrderConfirm />,
    },
    {
        path: "dashboard/sales_order/ready_to_confirm",
        element: <ReadyToSalesOrderConfirm />,
    },
    {
        path: "dashboard/purchaser_order/ready_to_confirm",
        element: <ReadyToPurchaserOrderConfirm />,
    },
    { path: "dashboard/sales_order/edit", element: <SalesOrderEdit /> },
    { path: "dashboard/purchaser_order/edit", element: <PurchaserOrderEdit /> },
    { path: "dashboard/customers", element: <Customer /> },
    { path: "dashboard/products", element: <Products /> },
    { path: "dashboard/organizationBank", element: <OrganizationBank /> },
    { path: "dashboard/shareholders", element: <Shareholders /> },
    { path: "dashboard/pettyCash", element: <PettyCashs /> },
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
    { path: "dashboard/lading/:id", element: <LadingPermit /> },
    { path: "dashboard/ready_to_lading", element: <ReadyToLading /> },
    { path: "dashboard/ready_to_exit", element: <ReadyToExit /> },
    // { path: "dashboard/exit/:id", element: <ExitRemittance /> },
    // { path: "dashboard/ladingReport", element: <LadingReport /> },
    { path: "dashboard/lading_list", element: <LadingList /> },
    { path: "dashboard/exit_list", element: <ExitList /> },
    { path: "dashboard/exitRemittanceList", element: <ExitRemittanceList /> },
    { path: "dashboard/payment", element: <RecievePayment /> },
    { path: "dashboard/payment/accounting", element: <PaymentAccounting /> },
    { path: "dashboard/payment/accounting/register", element: <PaymentAccountingRegister /> },
    { path: "dashboard/payment/accounting/register/list", element: <PaymentAccountingRegisterList /> },
    { path: "dashboard/payment/accounting/:id", element: <Detail /> },
    { path: "dashboard/payment/accounting/register/:id", element: <SinglePaymentRegister /> },
    { path: "dashboard/payment/edit/:id", element: <RecievePaymentEdit /> },
    { path: "dashboard/brands", element: <Brands /> },
    { path: "dashboard/productTypes", element: <ProductTypes /> },
    { path: "dashboard/customerWarehouse", element: <CustomerWarehouse /> },
    { path: "dashboard/productState", element: <ProductState /> },
    { path: "dashboard/productStandard", element: <ProductStandards /> },
    { path: "dashboard/labels", element: <CustomerLabels /> },
    { path: "dashboard/warehouses", element: <Warehouse /> },
    { path: "dashboard/productInventories", element: <ProductInventories /> },
    { path: "dashboard/productInventoriesSepehr", element: <ProductInventoriesSepehr /> },
    { path: "dashboard/productBrand", element: <ProductBrands /> },
    { path: "dashboard/productService", element: <ProductService /> },
    { path: "dashboard/transferWarehouse", element: <TransferBetweenWarehouse /> },
    
    { path: "dashboard/billlanding", element: <Billlanding /> },
    { path: "dashboard/billlandingEdit/:id", element: <BilllandingEdit /> },
    { path: "dashboard/billlandingList", element: <ListOfBilllanding /> },
    { path: "dashboard/billlandingList/:id", element: <BilllandingDetails /> },
    { path: "dashboard/transferRemittance/:id/entrance", element: <EntrancePermit /> },
    { path: "dashboard/transferRemittance", element: <TransferRemitancesList /> },
    { path: "dashboard/transferRemittance/:id", element: <TrasnferRemittanceDetails /> },
    { path: "dashboard/entranceList", element: <EntranceList /> },
    { path: "dashboard/entranceReport", element: <EntranceList /> },
    { path: "dashboard/ready_to_evacuation", element: <ReadyToEvacuation /> },

    { path: "dashboard/evacuation/:id/:entranceId", element: <EvacuationPermit /> },
    { path: "dashboard/evacuation", element: <EvacuationPermit /> },
    
    { path: "dashboard/ready_to_rent", element: <ReadyToRent /> },
    { path: "dashboard/rents", element: <RentPaymentList /> },
    { path: "dashboard/approvedRent", element: <ApprovedRentPayment /> },


    { path: "dashboard/users", element: <Users /> },
    { path: "dashboard/user/create", element: <UserForm /> },
    { path: "dashboard/user/role/:id", element: <RoleUser /> },
    { path: "dashboard/roles", element: <Roles /> },
    { path: "dashboard/groups", element: <RoleGroups /> },
    // { path: "dashboard/groups/form", element: <GroupForm /> },
    { path: "dashboard/permissions", element: <Permissions /> },
    
    // prints
    { path: "dashboard/rent_print/:id", element: <RentPrint /> },
    { path: "dashboard/ladingPermit_print/:id/:ladingCode/:ladingDateYear/:ladingDateMonth/:ladingDateDay", element: <LadingPermitPrint /> },
    { path: "dashboard/ladingExitPermit_print/:id/:ladingCode/:ladingDateYear/:ladingDateMonth/:ladingDateDay", element: <LadingExitPermitPrint /> },
    { path: "dashboard/evacution_print", element: <EvacutionPrint /> },
    { path: "dashboard/ladingExitPermitOfficial_print/:id/:ladingCode/:ladingDateYear/:ladingDateMonth/:ladingDateDay", element: <LadingExitPermitPrintOfficial /> },
    { path: "dashboard/approveDriverFareAmount/:id/:ladingCode/:ladingDateYear/:ladingDateMonth/:ladingDateDay", element: <ApprovedRentPayment /> },
    { path: "dashboard/ladingExitPermitDetail/:id/:ladingCode/:ladingDateYear/:ladingDateMonth/:ladingDateDay", element: <ExitDetail /> },
    { path: "dashboard/exit/:id/:ladingCode/:ladingDateYear/:ladingDateMonth/:ladingDateDay", element: <ExitRemittance /> },
    { path: "dashboard/exitEdit/:id/:ladingCode/:ladingDateYear/:ladingDateMonth/:ladingDateDay", element: <ExitRemiitanceEdit /> },
    { path: "dashboard/cargoAnnouncment/:id", element: <CargoDetail /> },

    { path: "dashboard/invoiceOfficial/:id", element: <InvoiceOfficial /> },
    { path: "dashboard/invoiceNotOfficial/:id", element: <InvoiceNotOfficial /> },

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
