// import { IMenuItem, IMenuItemResponse } from "../core/_models";

// export const parseMenuItems = (items: IMenuItemResponse[]): IMenuItem[] => {
//   return items?.map((node) => ({
//     title: node.applicationMenuNames[0]?.menuName,
//     icon: node?.menuIcon,
//     id: node?.id,
//     description: node?.description,
//     to: node?.accessUrl,
//   }));
// };


import { IMenuItem, IMenuItemResponse } from "../core/_models";

const notAllowedItems = ["ویرایش کاربر", "دسترسی کاربر", "پرینت فاکتور"];

export const parseMenuItems = (items: IMenuItemResponse[]): IMenuItem[] => {
  return items?.map((node: any) => ({
    // title: i18next.t(node.applicationMenuNames[0]?.menuName),
    title: node.description,
    icon: node?.menuIcon,
    id: node?.id,
    description: node?.description,
    to: node?.accessUrl,
    children: node.children
      .filter((item: any) => !notAllowedItems.includes(item.menuARName))
      .map((nodeSubMenu: any) => ({
        // title: i18next.t(nodeSubMenu.applicationMenuNames[0]?.menuName),
        title: node.description,
        icon: nodeSubMenu?.menuIcon,
        id: nodeSubMenu?.id,
        description: nodeSubMenu?.description,
        to: nodeSubMenu?.accessUrl,
      })),
  }));
};
