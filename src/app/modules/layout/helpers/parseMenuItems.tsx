import { IMenuItem, IMenuItemResponse } from "../core/_models";

const parseMenuItem = (node: IMenuItemResponse): IMenuItem => ({
  title: node.description,
  icon: node.menuIcon,
  id: node.id,
  description: node.description,
  to: node.accessUrl,
  children: node.children
    .map(parseMenuItem) // Recursively parse children
});

export const parseMenuItems = (items: IMenuItemResponse[]): IMenuItem[] => {
  if (!items) return [];
  
  return items.map(parseMenuItem);
};
