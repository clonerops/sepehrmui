import { Navigate, Route, Routes } from "react-router-dom";
import MasterLayout from "../modules/layout/MasterLayout";
import Customer from "../modules/customer/Customer";
import Products from "../modules/product/Products";
import Suppliers from "../modules/product/Suppliers";
import ProductPrice from "../modules/product/ProductPrice";
import Cargo from "../modules/cargo/Cargo";
import Confirm from "../modules/cargo/components/Confirm";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route>
          {/* Redirect to Dashboard after success login/registartion */}
          <Route path="auth/*" element={<Navigate to="/dashboard" />} />
          <Route path="dashboard/customers" element={<Customer />} />
          <Route path="dashboard/products" element={<Products />} />
          <Route path="dashboard/suppliers" element={<Suppliers />} />
          <Route path="dashboard/productPrices" element={<ProductPrice />} />
          <Route path='dashboard/cargo' element={<Cargo />} />
          <Route path='dashboard/cargo/confirm/:id' element={<Confirm />} />

          {/* Lazy Modules */}
          {/* Page Not Found */}
          <Route path="*" element={<Navigate to="/error/404" />} />
        </Route>
      </Route>
    </Routes>
  );
};

export { PrivateRoutes };
