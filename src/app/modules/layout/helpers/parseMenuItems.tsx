import { IMenuItem, IMenuItemResponse } from "../core/_models";

export const parseMenuItems = (items: IMenuItemResponse[]): IMenuItem[] => {
  return items?.map((node) => ({
    title: node.applicationMenuNames[0]?.menuName,
    icon: node?.menuIcon,
    id: node?.id,
    description: node?.description,
    to: node?.accessUrl,
  }));
};
