import {
  Checkbox,
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
import { memo } from "react";

export type FormikSelectPropsType<Value> = {
  name: string;
  label: string;
  boxClassName?: string;
  disabeld?: boolean;
  onChange?: (selectedValue: any) => void;
  options: {
    label: string;
    value: any;
  }[];
} & SelectProps<Value>;

const FormikSelectCheckbox = <Value,>(props: FormikSelectPropsType<Value>) => {
  const {
    boxClassName,
    name,
    label,
    disabeld,
    options,
    onChange,
    ...rest
  } = props;
  const [field] = useField({ name });  // Removed 'value' from useField
  const formikProps = useFormikContext();
  const handleSelectChange = (event: SelectChangeEvent<Value>) => {
    const selectedValue = event.target.value;
    if (onChange) {
      onChange(selectedValue);
    }
    formikProps.setFieldValue(name, selectedValue);
  };
  return (
    <div className={cx("w-full", boxClassName)}>
      <FormControl fullWidth size={"small"} error={getFormikFieldValidationProps(formikProps, name).error}>
        <InputLabel id={label + "-label"}>{label}</InputLabel>
        <Select
          size={"small"}
          multiple
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
          value={field.value || []}
          renderValue={(selected: any) => (
            <div className='flex gap-x-4'>
              {options
                .filter((option) => selected.includes(option.value))
                .map((option) => (
                  <Typography key={option.value}>{option.label}, </Typography>
                ))}
            </div>
          )}
        >
          {options?.map((node, index) => (
            <MenuItem key={index} value={node.value}>
              <Checkbox
                checked={
                  field.value?.indexOf(node.value) !== -1 
                }
              />
              {node.label}
            </MenuItem>
          ))}
        </Select>
        <Typography variant="body2" className={"text-red-600"}>
          {getFormikFieldValidationProps(formikProps, name).helpertext}
        </Typography>
      </FormControl>
    </div>
  );
};
export default memo(FormikSelectCheckbox);
