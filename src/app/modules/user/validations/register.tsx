import * as Yup from "yup"
import { numberRegExp } from "../../../../_cloner/helpers/NumberReg";


export const registerSchema = Yup.object().shape({
    firstName: Yup.string().required("فیلد الزامی می باشد"),
    // lastName: Yup.string().required("فیلد الزامی می باشد"),
    // email: Yup.string()
    //   .email()
    //   .required("فیلد الزامی می باشد"),
    // userName: Yup.string()
    //   .min(6)
    //   .required("فیلد الزامی می باشد"),
    // mobileNo: Yup.string()
    //   .required("فیلد الزامی می باشد")
    //   .matches(numberRegExp)
    //   .test(
    //     "mobileNo",
    //     (value) => value?.length === 11,
    //   ),
    // password: Yup.string()
    //   .min(6)
    //   .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    //   .required("فیلد الزامی می باشد"),
    // confirmPassword: Yup.string()
    //   .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
    //   .required("فیلد الزامی می باشد")
    //   .oneOf([Yup.ref("password")]),
  });
  