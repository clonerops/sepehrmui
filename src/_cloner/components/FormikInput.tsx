import { Box, TextField } from "@mui/material";
import * as translation from "../../../public/assets/locales/en/translation.json";
import cx from "classnames";
import {
  TextFieldProps,
  TextFieldVariants,
} from "@mui/material/TextField/TextField";
import { useField, useFormikContext } from "formik";
import { getFormikFieldValidationProps } from "../helpers/GetFormikFieldValidationProps";

export type Label = keyof typeof translation;

type Props = {
  label: string;
  name: string;
  disabled?: boolean;
  value?: string;
  title?: string
  variant?: TextFieldVariants;
  boxClassName?: string;
} & Omit<TextFieldProps, "variant">;

const FormikInput = (props: Props) => {
  const { boxClassName, label, title, disabled, name, value, ...rest } = props;


  const [field] = useField({ name, value });
  const formikProps = useFormikContext();

  return (
    <Box component={"div"} className={cx("w-full", boxClassName)}>
      <TextField
        {...getFormikFieldValidationProps(formikProps, name)}
        {...field}
        {...rest}
        fullWidth
        size="small"
        label={label}
        disabled={disabled}
        color="primary"
        variant={"outlined"}
        id={name}
        value={field.value || ""}
      />
    </Box>
  );
};
export default FormikInput;
