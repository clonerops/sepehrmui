import { forwardRef } from "react";
import { Box, TextField, Typography } from "@mui/material";
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
    label: Label;
    value?: string;
    setFieldValue?: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined
    ) => Promise<void | FormikErrors<{}>>;
};

const FormikDatepicker = forwardRef((props: Props) => {
    const { boxClassName, name, label, value, ...rest } = props;

    const [field, , helpers] = useField({ name, value });
    const formikProps = useFormikContext();
    const validationProps = getFormikFieldValidationProps(formikProps, name);

    const handleChange = (date: any) => {
        const formattedDate = moment(new Date(date)).format("jYYYY/jMM/jDD");
        helpers.setValue(formattedDate);
    };

    return (
        <>
            <Box component="div" className={cx("w-full", boxClassName)}>
                <MultiDatepicker
                    {...field}
                    {...rest}
                    {...validationProps}
                    value={field.value}
                    onChange={handleChange}
                    locale={persian_fa}
                    calendar={persian}
                    id={name}
                    customInput={
                        <TextField
                            size="small"
                            fullWidth
                            variant="outlined"
                            label={label}
                            id={name}
                            error={validationProps.error}
                        />
                    }
                />

                {/* <DatePicker
            {...field}
            {...rest}
            {...validationProps}
            selected={field.value}
            wrapperClassName={"w-full"}
            onChange={(value) => helpers.setValue(value)}
            ref={ref}
            customInput={
              <TextField
                size="small"
                fullWidth
                variant="outlined"
                label={label}
                id={name}
                error={validationProps.error}
              />
            }
          /> */}
                {validationProps.error && (
                    <Typography variant="body2" className="text-red-500 pl-4">
                        {validationProps.helperText}
                    </Typography>
                )}
            </Box>
        </>
    );
});

export default FormikDatepicker;
