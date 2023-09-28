import * as Yup from "yup";
import { i18next } from "../../../../_helpers/helpers/I18next";

export const loginValidation = Yup.object({
  userName: Yup.string().required(() => i18next.t("Username_required")),
  password: Yup.string().required(() => i18next.t("Password_required")),
});

export const ChangePassValidation = Yup.object({
  prevPass: Yup.string().required(() => i18next.t("Required")),
  newPass: Yup.string().required(() => i18next.t("Required")),
  repeatPass: Yup.string()
    .oneOf([Yup.ref("newPass")], () => i18next.t("Match_Password"))
    .required(() => i18next.t("Required")),
});
