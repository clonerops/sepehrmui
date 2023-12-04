import { Typography } from "@mui/material";
import { FormikProps } from "formik";

export const getFormikFieldValidationProps = (
  formikProps: FormikProps<any>,
  fieldName: string,
) => {
  const { touched, errors, getFieldProps } = formikProps;
  const error = touched?.[fieldName] && Boolean(errors?.[fieldName]);

  // const helpertext = <>{touched?.[fieldName] && errors?.[fieldName]}</>;
  const helpertext = touched?.[fieldName] && errors?.[fieldName] ? (
    <Typography variant="body2">{errors[fieldName] as string}</Typography>
  ) : null;

  return { error: error, helpertext: helpertext, ...getFieldProps(fieldName) };
};
