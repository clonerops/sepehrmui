import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { SelectChangeEvent, SelectProps } from "@mui/material/Select/Select";
import { useField, useFormikContext } from "formik";
import { getFormikFieldValidationProps } from "../helpers/GetFormikFieldValidationProps";
import cx from "classnames";

export type FormikSelectPropsType<Value> = {
  name: string;
  label: string;
  value?: any;
  boxClassName?: string;
  disabeld?: boolean;
  onChange?: (selectedValue: any) => void;
  options: {
    label: string;
    value: any;
  }[];
} & SelectProps<Value>;

const FormikSelect = <Value,>(props: FormikSelectPropsType<Value>) => {
  const {
    boxClassName,
    name,
    label,
    disabeld,
    defaultValue,
    value,
    options,
    onChange,
    ...rest
  } = props;
  const [field] = useField({ name, value });
  const formikProps = useFormikContext();
  const handleSelectChange = (event: SelectChangeEvent<Value>) => {
    const selectedValue = event.target.value;
    if (onChange) {
      onChange(selectedValue);
    }
    formikProps.setFieldValue(name, selectedValue);
  };

  return (
    <Box component={"div"} className={cx("w-full", boxClassName)}>
      <FormControl fullWidth size={"small"} error={getFormikFieldValidationProps(formikProps, name).error}>
        <InputLabel id={label + "-label"}>{label}</InputLabel>
        <Select
          size={"small"}
          variant={"outlined"}
          labelId={label + "-label"}
          id={label}
          label={label}
          disabled={disabeld}
          {...field}
          {...rest}
          {...getFormikFieldValidationProps(formikProps, name)}
          aria-errormessage={"asdfsdf"}
          onChange={handleSelectChange}
          value={field.value || ""}
        >
          {options?.map((node, index) => (
            <MenuItem key={index} value={node.value}>{node.label}</MenuItem>
          ))}
        </Select>
        <Typography variant="body2" className={"text-red-600"}>
          {getFormikFieldValidationProps(formikProps, name).helpertext}
        </Typography>
      </FormControl>
    </Box>
  );
};
export default FormikSelect;
