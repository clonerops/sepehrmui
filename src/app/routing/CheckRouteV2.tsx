import React, { useMemo, useState } from "react";
import { matchPath, useLocation } from "react-router-dom"
import { PrivateRoutes } from "./PrivateRoutes";
import { useGetAllApplicationMenus } from "../modules/roleMenus/_hooks";
import AccessDenied from "./AccessDenied";
import LazyLoad from "../../_cloner/components/LazyLoad";
import { result } from "lodash";

interface IUserAccessMenuResult {
  accessUrl: string
  children: {
    accessUrl: string
  }[]
}

const CheckRouteV2 = () => {
  const { pathname } = useLocation();
  const userAccessMenusTools = useGetAllApplicationMenus()
  

  const routes: any = useMemo(() => {
    
    const results: {path: string}[] = [{path: "dashboard"}];

    userAccessMenusTools?.data?.data.map((item: IUserAccessMenuResult) => {
      results.push({path: item.accessUrl})
      if(item.children.length > 0) {
        item.children.map((childItem: any) => {
          results.push({path: childItem.accessUrl}) 
          if(childItem.children.length > 0) {
            childItem.children.map((childItem2: {accessUrl: string}) => {
              results.push({path: childItem2.accessUrl}) 
            })
          }
        })
      }
    })

    return results
  }, [userAccessMenusTools?.data?.data, pathname])

  const checkRoute = (): React.ReactNode => {
    
    const isMatch = routes.some((item: {path: string}) => matchPath(item.path, pathname))

    if(isMatch) {
      return <PrivateRoutes />
    } else {
      return <AccessDenied />
    }

  }  

  if(userAccessMenusTools.isLoading) {
    return <LazyLoad loading={userAccessMenusTools.isLoading} />
  }

  return (
    <>
      {checkRoute()}
    </>
  )
}

export default CheckRouteV2