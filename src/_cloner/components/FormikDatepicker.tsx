import { forwardRef } from "react";
import { TextField, Typography } from "@mui/material";
import { FormikErrors, useField, useFormikContext } from "formik";
import MultiDatepicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { getFormikFieldValidationProps } from "../helpers/GetFormikFieldValidationProps";
import * as translation from "../../../public/assets/locales/en/translation.json";
import cx from "classnames";
import moment from "moment-jalaali";

export type Label = keyof typeof translation;

type Props = {
    boxClassName?: string;
    name: string;
    label: string;
    value?: string;
    disabled?: boolean;
    setFieldValue?: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined
    ) => Promise<void | FormikErrors<{}>>;
};

const FormikDatepicker = forwardRef((props: Props, ref) => {
    const { boxClassName, name, label, value, disabled, ...rest } = props;

    const [field, , helpers] = useField({ name, value });
    const formikProps = useFormikContext();
    const validationProps = getFormikFieldValidationProps(formikProps, name);

    const handleChange = (date: any) => {
        if (date !== null) {
            // If no date is selected, set the date as usual
            const formattedDate = moment(new Date(date)).format("jYYYY/jMM/jDD");
            helpers.setValue(formattedDate);
        } else {
            helpers.setValue("");
        }
    };

    return (
        <>
            <div className={cx("w-full", boxClassName)}>
                <MultiDatepicker
                    {...field}
                    {...rest}
                    {...validationProps}
                    value={field.value || ""}
                    onChange={handleChange}
                    locale={persian_fa}
                    disabled={disabled}
                    calendar={persian}
                    className={cx("w-full")}
                    id={name}                       
                    render={
                        <TextField
                            size="small"
                            fullWidth
                            variant="outlined"
                            color="primary"
                            disabled={disabled}
                            label={label}
                            id={name}
                            error={validationProps.error}
                        />
                    }
                />
                {validationProps.error && (
                    <Typography variant="body2" className="text-red-500 pl-4">
                        {validationProps.helpertext}
                    </Typography>
                )}
            </div>
        </>
    );
});

export default FormikDatepicker;
