import * as Yup from "yup";

export const postRoleMenusValidation = Yup.object({
  roleId: Yup.string().required(),
  applicationMenuId: Yup.mixed().required(),
});
