import { Navigate, Route, Routes } from "react-router-dom";
import MasterLayout from "../modules/layout/MasterLayout";

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route>
          {/* Redirect to Dashboard after success login/registartion */}
          <Route path="auth/*" element={<Navigate to="/dashboard" />} />
          {/* <Route path="dashboard" element={<Dashboard />} /> */}
          {/* Lazy Modules */}
          {/* Page Not Found */}
          <Route path="*" element={<Navigate to="/error/404" />} />
        </Route>
      </Route>
    </Routes>
  );
};

export { PrivateRoutes };
