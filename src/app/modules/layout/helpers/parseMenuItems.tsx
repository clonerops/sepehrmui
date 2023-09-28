import { IMenuItem, IMenuItemResponse } from "../core/_models";
import i18next from "i18next";

export const parseMenuItems = (items: IMenuItemResponse[]): IMenuItem[] => {
  return items?.map((node) => ({
    title: i18next.t(node.applicationMenuNames[0]?.menuName),
    icon: node?.menuIcon,
    id: node?.id,
    description: node?.description,
    to: node?.accessUrl,
  }));
};
