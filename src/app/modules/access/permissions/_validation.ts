import * as Yup from "yup";

export const createPermissionValidation = Yup.object({
  title: Yup.string().required(),
});
