import { Box, Checkbox, Typography } from "@mui/material";
import * as translation from "../../../public/assets/locales/en/translation.json";
import cx from "classnames";
import {
  CheckboxProps,
} from "@mui/material/Checkbox/Checkbox";
import { useField, useFormikContext } from "formik";
import { getFormikFieldValidationProps } from "../helpers/GetFormikFieldValidationProps";

export type Label = keyof typeof translation;

type Props = {
  label: string;
  name: string;
  disabled?: boolean;
  value?: string;
  title?: string
  variant?: any;
  boxClassName?: string;
} & Omit<CheckboxProps, "variant">;

const FormikCheckbox = (props: Props) => {
  const { boxClassName, label, title, disabled, name, value, ...rest } = props;


  const [field] = useField({ name, value });
  const formikProps = useFormikContext();

  return (
    <Box component={"div"} className={cx("my-2", boxClassName)}>
      <Checkbox
        size="small"
        disabled={disabled}
        variant={"outlined"}
        id={name}
        {...getFormikFieldValidationProps(formikProps, name)}
        {...field}
        {...rest}
      />
    </Box>
  );
};
export default FormikCheckbox;
