export interface IPermission {
    id?: string | undefined | null
    name: string,
    applicationMenuId: string
    description?: string;
}



export interface IPermissionMenu {
    applicationMenuId: string
    applicationMenuName: string
    permissionId: string
    permissionName: string
    permissions: {
      id: string
      permissionName: string
      applicationMenuId: string
      applicationMenuName: string
      description: string
  
    }[]
  
  }