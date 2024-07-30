export interface IMenuItemResponse {
  id: string;
  accessUrl: string;
  description: string;
  menuIcon: string;
  children: any
  applicationMenuNames: {
    menuName: string;
    language: string;
  }[];
}
export interface IMenuItem {
  id: string;
  title: string;
  icon: string;
  description: string;
  to: string;
  children: any
}
