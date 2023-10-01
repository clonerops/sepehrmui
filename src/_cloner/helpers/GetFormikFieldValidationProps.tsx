import { Typography } from "@mui/material";
import { FormikProps } from "formik";

export const getFormikFieldValidationProps = (
  formikProps: FormikProps<any>,
  fieldName: string,
) => {
  const { touched, errors, getFieldProps } = formikProps;
  const error = touched?.[fieldName] && Boolean(errors?.[fieldName]);

  // const helperText = <>{touched?.[fieldName] && errors?.[fieldName]}</>;
  const helperText = touched?.[fieldName] && errors?.[fieldName] ? (
    <Typography variant="body2">{errors[fieldName] as string}</Typography>
  ) : null;

  return { error: error, helperText: helperText, ...getFieldProps(fieldName) };
};
