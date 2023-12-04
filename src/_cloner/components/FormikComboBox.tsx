// import {
//     Box,
//     Autocomplete,
//     Typography,
// } from "@mui/material";
// import * as translation from "../../../public/assets/locales/en/translation.json";
// import cx from "classnames";
// import TextField, {
//     TextFieldProps,
//     TextFieldVariants,
// } from "@mui/material/TextField/TextField";
// import { useField, useFormikContext } from "formik";
// import { getFormikFieldValidationProps } from "../helpers/GetFormikFieldValidationProps";

// export type Label = keyof typeof translation;

// type Props = {
//     label: string | undefined;
//     name: string;
//     disabled?: boolean;
//     value?: string;
//     title?: string;
//     defaultValue?: {
//         label: string,
//         value: any
//     }
//     options: any;
//     getOptionLabel?: any;
//     getOptionValue?: any;
//     variant?: TextFieldVariants;
//     onChange?: any;
//     boxClassName?: string;
// } & Omit<TextFieldProps, "variant">;

// const FormikComboBox = (props: Props) => {
//     const {
//         boxClassName,
//         label,
//         title,
//         defaultValue,
//         disabled,
//         name,
//         value,
//         options,
//         onChange,
//         ...rest
//     } = props;

//     const [field]: any = useField({ name, value });
//     const formikProps = useFormikContext();
    
//     return (
//         <Box component={"div"} className={cx("w-full", boxClassName)}>
//             <Autocomplete
//                 {...field}
//                 {...rest}
//                 {...getFormikFieldValidationProps(formikProps, name)}
//                 options={options || []}
//                 value={field.value}
//                 disabled={disabled}
//                 defaultValue={defaultValue}
//                 getOptionSelected={(option: any, value: any) => option.id === value.id}
//                 onChange={(e, value) => formikProps.setFieldValue(name, value)}
//                 filterOptions={(optionData, { inputValue }) => {
//                     const searchWords = inputValue.trim().toLowerCase().split(/\s+/);
//                     return optionData.filter((item: any) => {
//                         return searchWords.every((word) => {
//                             return item.label.toLowerCase().includes(word)
//                         })
//                     })
//                 }}
//                 renderInput={(params) => (
//                     <TextField
//                         label={label}
//                         name={name}
//                         color="primary"
//                         error={getFormikFieldValidationProps(formikProps, name).error}
//                         {...params}
//                         size="small"
//                     />
//                 )}
//                 id={name}
//             />
//             <Typography variant="body2" className={"text-red-600"}>
//                 {getFormikFieldValidationProps(formikProps, name).helpertext}
//             </Typography>

//         </Box>
//     );
// };
// export default FormikComboBox;
import { Box, Autocomplete, Typography } from "@mui/material";
import cx from "classnames";
import TextField, {
    TextFieldProps,
    TextFieldVariants,
} from "@mui/material/TextField/TextField";
import { useField, useFormikContext } from "formik";
import { getFormikFieldValidationProps } from "../helpers/GetFormikFieldValidationProps";

type Props = {
    label: string;
    name: string;
    disabled?: boolean;
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
        <Box component={"div"} className={cx("w-full", boxClassName)}>
            <Autocomplete
                {...field}
                {...rest}
                {...getFormikFieldValidationProps(formikProps, name)}
                options={options || []}
                value={field?.value}
                disabled={disabled}
                renderOption={renderOption}
                isOptionEqualToValue={(option: any, value) =>
                    option.id === value.id
                }
                defaultValue={defaultValue}
                // getOptionSelected={(option: any, value: any) =>
                //     option.id === value.id
                // }
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
                renderInput={(params: any) => (
                    <TextField
                        label={label}
                        name={name}
                        error={
                            getFormikFieldValidationProps(formikProps, name)
                                .error
                        }
                        {...params}
                        size="small"
                    />
                )}
                id={name}
            />
            <Typography variant="body2" className={"text-red-600"}>
                {getFormikFieldValidationProps(formikProps, name).helpertext}
            </Typography>
        </Box>
    );
};
export default FormikComboBox;

