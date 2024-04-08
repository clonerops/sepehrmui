import { TextField, Typography } from "@mui/material";
import * as translation from "../../../public/assets/locales/en/translation.json";
import cx from "classnames";
import {
  TextFieldProps,
  TextFieldVariants,
} from "@mui/material/TextField/TextField";
import { useField, useFormikContext } from "formik";
import { getFormikFieldValidationProps } from "../helpers/GetFormikFieldValidationProps";
import { memo } from "react";

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
    <div className={cx("w-full", boxClassName)}>
      <TextField
        {...field}
        {...getFormikFieldValidationProps(formikProps, name)}
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
      {getFormikFieldValidationProps(formikProps, name).helpertext?.props.children &&
        <Typography className="text-red-500">
          {getFormikFieldValidationProps(formikProps, name).helpertext?.props.children}
        </Typography>
      }

    </div>
  );
};
export default memo(FormikInput);
