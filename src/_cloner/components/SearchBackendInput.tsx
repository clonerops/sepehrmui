import { Box, TextField, Typography } from "@mui/material";
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
  value?: any;
  title?: string
  variant?: TextFieldVariants;
  onChange?: any;
  boxClassName?: string;
} & Omit<TextFieldProps, "variant">;

const SearchBackendInput = (props: Props) => {
  const { boxClassName, label, title, disabled, name, value, onChange, ...rest } = props;

  return (
    <Box component={"div"} className={cx("w-full", boxClassName)}>
      <TextField
        fullWidth
        size="small"
        label={label}
        disabled={disabled}
        color="primary"
        variant={"outlined"}
        id={name}
        value={value}
        onChange={onChange}
      />
    </Box>
  );
};
export default memo(SearchBackendInput);
