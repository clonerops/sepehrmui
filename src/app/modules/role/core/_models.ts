export interface IRole {
  id: string;
  name: string;
  concurrencyStamp: string | null;
}

export interface IRoleMenu {
  roleId: string;
  applicationMenuId: string;
}

export interface IUserRole {
  roleName: string;
  roleDesc: string | undefined;
  roleId: string;
  userId: string;
}

export type IUpdateRole = Pick<IUserRole, "roleId" | "userId">;
export interface IApplicationMenu {
  id: string;
  accessUrl: string;
  description: string;
  menuIcon: string;
  // applicationMenuNames: []
}
