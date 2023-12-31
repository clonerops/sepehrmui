import { FC } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
// import { ErrorsPage } from "../modules/errors/ErrorsPage";
import Cookies from "js-cookie";
import App from "../App";
import Login from "../modules/auth/Login";
import CheckRoute from "./CheckRoute";
import ErrorsPage from "./ErrorsPage";

const { PUBLIC_URL } = process.env;

const AppRoutes: FC = () => {

  return (
    <BrowserRouter basename={PUBLIC_URL}>
      <Routes>
        <Route element={<App />}>
        <Route path="error/*" element={<ErrorsPage />} />
          {Cookies.get("token") ? (
            <>
              <Route path="/*" element={<CheckRoute />} />
              <Route index element={<Navigate to="/dashboard" />} />
            </>
          ) : (
            <>
              <Route path="auth/*" element={<Login />} />
              <Route path="*" element={<Navigate to="/auth" />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { AppRoutes };
