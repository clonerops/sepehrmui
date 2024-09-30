import React, { useMemo } from "react";
import { matchPath, useLocation } from "react-router-dom"
import { PrivateRoutes } from "./PrivateRoutes";
import { useGetAllApplicationMenus } from "../modules/roleMenus/_hooks";
import AccessDenied from "./AccessDenied";
import LazyLoad from "../../_cloner/components/LazyLoad";
import { AuthProvider } from "../../_cloner/helpers/checkUserPermissions";
import { useUserInfo } from "../modules/user/core/_hooks";

interface IUserAccessMenuResult {
  accessUrl: string
  children: {
    accessUrl: string
  }[]
}

const CheckRouteV2 = () => {

  const { data: userInfo } = useUserInfo()

  const rolePermissions = userInfo?.data?.userRoles
    ?.flatMap((item: any) =>
      item?.role?.rolePermissions?.map((r: any) => r.permissionName) || []
    ) || []

  const { pathname } = useLocation();
  const userAccessMenusTools = useGetAllApplicationMenus()

  const routes: any = useMemo(() => {
    const extractPaths = (items: IUserAccessMenuResult[]): { path: string }[] => {
      let results: { path: string }[] = [];

      items.forEach((item: any) => {
        results.push({ path: item.accessUrl });
        if (item.children && item.children.length > 0) {
          results = results.concat(extractPaths(item.children));
        }
      });

      return results;
    };

    const baseRoutes: { path: string }[] = [{ path: 'dashboard' }];
    const userRoutes = userAccessMenusTools?.data?.data ? extractPaths(userAccessMenusTools.data.data) : [];

    return baseRoutes.concat(userRoutes);
  }, [userAccessMenusTools?.data?.data]);

  const checkRoute = (): React.ReactNode => {

    // const isMatch = routes.some((item: {path: string}) => matchPath(item.path, pathname))
    const matchedRoute = routes.some(({ path }: any) => matchPath({ path, end: false }, pathname));

    if (matchedRoute) {
      return <PrivateRoutes />
    } else {
      return <AccessDenied />
    }

  }

  if (userAccessMenusTools.isLoading) {
    return <LazyLoad loading={userAccessMenusTools.isLoading} />
  }

  return (
    <>
      <AuthProvider permissions={rolePermissions || []}>
        {checkRoute()}
      </AuthProvider>

    </>
  )
}

export default CheckRouteV2