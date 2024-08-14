import * as Yup from "yup";

export const rejectReasonValidation = Yup.object({
    rejectReasonDesc: Yup.string().required("فیلد اجباری می باشد"),
});

