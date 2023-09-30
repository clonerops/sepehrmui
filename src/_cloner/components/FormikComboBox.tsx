import { Box, Autocomplete, Typography, SelectChangeEvent } from "@mui/material";
import * as translation from "../../../public/assets/locales/en/translation.json";
import cx from "classnames";
import TextField, {
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
  title?: string;
  options: any;
  variant?: TextFieldVariants;
  onChange?: any;
  boxClassName?: string;
} & Omit<TextFieldProps, "variant">;

const FormikComboBox = (props: Props) => {
  const { boxClassName, label, title, disabled, name, value, options, onChange, ...rest } = props;


  const [field]: any = useField({ name, value });
  const formikProps = useFormikContext();


  return (
    <Box component={"div"} className={cx("w-full", boxClassName)}>
      <Autocomplete
        {...getFormikFieldValidationProps(formikProps, name)}
        {...field}
        {...rest}
        options={options || []}
        onChange={(e, value) => formikProps.setFieldValue(name, value)}
        renderInput={(params) => <TextField
          label={label}
          name={name}
          {...params}
          size="small"
        />}
        id={name}
      />
    </Box>
  );
};
export default FormikComboBox;
