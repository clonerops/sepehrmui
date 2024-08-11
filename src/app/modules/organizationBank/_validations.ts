import * as Yup from "yup";

const createOrganizationBankValidations = Yup.object().shape({
    bankId: Yup.string()
        .required("فیلد الزامی است"),
    accountOwner: Yup.string()
        .required("فیلد الزامی است"),
    accountNo: Yup.string()
        .required("فیلد الزامی است"),
    branchName: Yup.string()
        .required("فیلد الزامی است"),
});

export {
    createOrganizationBankValidations
}