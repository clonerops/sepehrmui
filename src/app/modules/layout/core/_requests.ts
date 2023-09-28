import { http } from "../../../../_cloner/helpers/axiosConfig";

export const getMenuItems = async () => {

  const {data} = await http.get('/v1/RoleMenu/GetApplicationMenus')
  return data
};
