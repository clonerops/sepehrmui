import * as Yup from "yup";

export const createPermissionValidation = Yup.object({
  name: Yup.string().required(),
});
