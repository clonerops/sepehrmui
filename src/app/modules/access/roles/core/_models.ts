export interface IRole {
  id?: string | undefined;
  name: string | undefined;
  description?: string | undefined;
  concurrencyStamp?: string | null;
}

export interface IRoleMenu {
  roleId: string | undefined;
  // applicationMenuId: string[] | null;
  applicationMenuId: any;
}

export interface IUserRole {
  roleName : string | undefined;
  roleDesc: string | undefined;
  roleId: string | undefined;
  userId: string | undefined;
}

export type IUpdateRole = Pick<IUserRole, "roleId" | "userId">;
export interface IApplicationMenu {
  id: string | undefined;
  accessUrl: string | undefined;
  description: string | undefined;
  menuIcon: string | undefined;
  // applicationMenuNames: []
}

