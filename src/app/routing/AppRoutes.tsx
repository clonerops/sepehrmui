import { FC } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import { ErrorsPage } from "../modules/errors/ErrorsPage";
import Cookies from "js-cookie";
import App from "../App";
import Login from "../modules/auth/Login";
import CheckRoute from "./CheckRoute";
import ErrorsPage from "./ErrorsPage";
import AccessDenied from "./AccessDenied";
import CheckRouteV2 from "./CheckRouteV2";
import { AuthProvider } from "../../_cloner/helpers/checkUserPermissions";
import { useUserInfo } from "../modules/user/core/_hooks";

const { PUBLIC_URL } = process.env;

const AppRoutes: FC = () => {

  return (
      <BrowserRouter basename={PUBLIC_URL}>
        <Routes>
          <Route element={<App />}>
            <Route path="error/*" element={<ErrorsPage />} />
            {Cookies.get("token") ? (
              <>

                <Route path="/dashboard/accessDenied" element={<AccessDenied />} />
                {/* <Route path="/*" element={<CheckRoute />} /> */}
                <Route path="/*" element={<CheckRouteV2 />} />
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
