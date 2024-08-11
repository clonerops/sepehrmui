import * as Yup from "yup";

const roleCreateValidation = Yup.object().shape({
    name: Yup.string().required("نام نقش الزامی است"),

});

const postRoleMenusValidation = Yup.object({
    roleId: Yup.string().required(),
    applicationMenuId: Yup.mixed().required(),
});
  
export { roleCreateValidation, postRoleMenusValidation };
