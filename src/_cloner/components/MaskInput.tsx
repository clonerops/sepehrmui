import { IMaskMixin } from "react-imask";
import {
  TextFieldProps,
  TextFieldVariants,
} from "@mui/material/TextField/TextField";
import { ReactMaskProps } from "react-imask/dist/mixin";
import { TextField } from "@mui/material";

type InputProps = {
  label: string;
  disabled?: boolean;
  value?: string;
  variant?: TextFieldVariants;
  className?: string;
} & Omit<TextFieldProps, "variant">;

export type MaskInputProps = ReactMaskProps & InputProps;

const MaskInput = IMaskMixin((props: MaskInputProps) => {
  const { label, disabled, inputRef, className, value, ...rest } = props;
  return (
    <TextField
      fullWidth
      size="small"
      label={label}
      disabled={disabled}
      variant={"outlined"}
      inputMode={"text"}
      className={className}
      type={"text"}
      inputProps={{ ...props.inputProps }}
      inputRef={inputRef}
      value={value}
      {...rest}
    />
  );
});

export default MaskInput;
