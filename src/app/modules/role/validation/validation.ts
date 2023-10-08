import * as Yup from "yup";

export const postRoleMenusValidation = Yup.object({
  roleId: Yup.string().required("فیلد الزامی می باشد"),
  applicationMenuId: Yup.string().required("فیلد الزامی می باشد"),
});
