import {
    Box,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import * as translation from "../../../public/assets/locales/en/translation.json";
import { useField, useFormikContext } from "formik";
import { getFormikFieldValidationProps } from "../helpers/GetFormikFieldValidationProps";

export type Label = keyof typeof translation;

type Props = {
    label: Label;
    name: string;
    value?: any,
    radioData: {
        value: any;
        label: string;
    }[];
};

const FormikRadioGroup = (props: Props) => {
    const { label, name, radioData, value, ...rest } = props;

    const { t } = useTranslation();
    const [field] = useField({ name, value });
    const formikProps = useFormikContext();
    const formikValigation = getFormikFieldValidationProps(formikProps, name);
    return (
        <Box component="div">
            <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                    {t(label)}
                </FormLabel>
                <RadioGroup
                    {...field}
                    {...rest}
                    {...formikValigation}
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    defaultValue={1}
                >
                    {radioData.map((item) => {
                        return (
                            <FormControlLabel
                                value={item.value}
                                control={<Radio />}
                                label={t(item.label)}
                            />
                        );
                    })}
                </RadioGroup>
            </FormControl>{" "}
        </Box>
    );
};

export default FormikRadioGroup;
