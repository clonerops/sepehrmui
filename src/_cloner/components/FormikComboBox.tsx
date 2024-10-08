import { Autocomplete, Typography } from "@mui/material";
import cx from "classnames";
import TextField, {
    TextFieldProps,
    TextFieldVariants,
} from "@mui/material/TextField/TextField";
import { useField, useFormikContext } from "formik";
import { getFormikFieldValidationProps } from "../helpers/getFormikFieldValidationProps";

type Props = {
    label: string;
    name: string;
    disabled?: boolean;
    isLabelSetValue?: boolean;
    value?: string;
    title?: string;
    defaultValue?: {
        label: string;
        value: any;
    };
    options: any;
    getOptionLabel?: any;
    getOptionValue?: any;
    variant?: TextFieldVariants;
    setState?: any;
    onChange?: any;
    renderOption?: any;
    boxClassName?: string;
} & Omit<TextFieldProps, "variant">;

const FormikComboBox = (props: Props) => {
    const {
        boxClassName,
        label,
        title,
        defaultValue,
        disabled,
        isLabelSetValue,
        name,
        setState,
        value,
        inputProps,
        options,
        onChange,
        renderOption,
        ...rest
    } = props;

    const [field]: any = useField({ name, value });
    const formikProps = useFormikContext();

    const handleSelectChange = (e: any, value: {value: any, label: string}) => {
        const selectedValue = value;
        if (onChange) {
            onChange(selectedValue);
        }
        formikProps.setFieldValue(name, value);
    };


    return (
        <div className={cx("w-full", boxClassName)}>
            <Autocomplete
                {...field}
                {...rest}
                {...getFormikFieldValidationProps(formikProps, name)}
                options={options || []}
                // value={field?.value?.label}
                value={isLabelSetValue ? field?.value?.label : field?.value}
                disabled={disabled}
                // renderOption={renderOption}
                renderOption={renderOption ? renderOption : (props, option: any) => {
                    return (
                      <li {...props} key={option?.value}>
                        {option?.label}
                      </li>
                    );
                  }}                
                isOptionEqualToValue={(option: any, value) => 
                    option?.id === value?.id
                }
                defaultValue={defaultValue}
                onChange={handleSelectChange}
                filterOptions={(optionData, { inputValue }) => {
                    const searchWords = inputValue
                        .trim()
                        .toLowerCase()
                        .split(/\s+/);
                    return optionData.filter((item: any) => {
                        return searchWords.every((word) => {
                            return item.label.toLowerCase().includes(word);
                        });
                    });
                }}
                renderInput={(params: any) => {
                    return  <TextField
                    label={label}
                    name={name}
                    error={
                        getFormikFieldValidationProps(formikProps, name)
                            .error
                    }
                    {...params}
                    size="small"
                />

                }}
            />
            <Typography variant="body2" className={"text-red-600"}>
                {getFormikFieldValidationProps(formikProps, name).helpertext}
            </Typography>
        </div>
    );
};
export default FormikComboBox;

