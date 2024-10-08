import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { SelectChangeEvent, SelectProps } from "@mui/material/Select/Select";
import { useField, useFormikContext } from "formik";
import { getFormikFieldValidationProps } from "../helpers/getFormikFieldValidationProps";
import cx from "classnames";
import { memo } from "react";
import { Clear } from "@mui/icons-material";

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

  const handleClear = () => {
    formikProps.setFieldValue(name, ''); // Clear the field value
  };


  return (
    <div className={cx("w-full", boxClassName)}>
      <FormControl fullWidth size={"small"} error={getFormikFieldValidationProps(formikProps, name).error}>
        <InputLabel id={label + "-label"}>{label}</InputLabel>
        <Select
          size={"small"}
          variant={"outlined"}
          labelId={label + "-label"}
          id={label}
          label={label}
          IconComponent={field.value ? null : undefined as any}
          endAdornment={field.value && (
            <IconButton
              aria-label="clear selection"
              onClick={handleClear}
              edge="end"
            >
              <Clear />
            </IconButton>
          )}
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
    </div>
  );
};
export default memo(FormikSelect);
