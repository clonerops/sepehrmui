import {
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@mui/material";
import { useField, useFormikContext } from "formik";
import { getFormikFieldValidationProps } from "../helpers/getFormikFieldValidationProps";

type Props = {
    label?: string;
    name: string;
    value?: any;
    onChange?: any;
    radioData: {
        value: any;
        label: string;
    }[];
};

const FormikRadioGroup = (props: Props) => {
    const { label, name, radioData, value, onChange, ...rest } = props;

    const [field] = useField({ name, value });
    const formikProps = useFormikContext();
    const formikValidation = getFormikFieldValidationProps(formikProps, name);
    const handleRadioChange = (e: any) => {
        if (onChange) {
            onChange(e.target.value);
        }
        formikProps.setFieldValue(name, e.target.value);
};

    return (
        <div>
            <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                    {label}
                </FormLabel>
                <RadioGroup
                    {...field}
                    {...rest}
                    {...formikValidation}
                    onChange={handleRadioChange}
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                >
                    {radioData?.map((item) => (
                        <FormControlLabel
                            key={item.value}
                            value={item.value}
                            control={<Radio sx={{ display: "none" }} />}
                            label={
                                <>
                                    <div
                                        className={`rounded-md py-2 px-4 ${
                                            Number(field.value) ===
                                            Number(item.value)
                                                ? "bg-[#272862] text-white"
                                                : "bg-gray-200"
                                        }`}
                                    >
                                        {item.label}
                                    </div>
                                </>
                            }
                        />
                    ))}
                </RadioGroup>
            </FormControl>{" "}
        </div>
    );
};

export default FormikRadioGroup;
