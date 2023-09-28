import { http } from "../../../../_helpers/helpers/axiosConfig";

export const getMenuItems = async () => {
  return await http
    .get("/v1/RoleMenu/GetApplicationMenus")
    .then((res) => res?.data);
};
