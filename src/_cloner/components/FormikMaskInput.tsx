import MaskInput from "./MaskInput";
import { ComponentProps, useEffect } from "react";
import { useField, useFormikContext } from "formik";
import { getFormikFieldValidationProps } from "../helpers/GetFormikFieldValidationProps";
import { Typography } from "@mui/material";
import cx from "classnames";

export type FormikMaskProps = ComponentProps<typeof MaskInput> & {
  name: string;
  label: string;
  value?: string;
};

const FormikMaskInput = (props: FormikMaskProps) => {
  const { name, value, label, ...rest } = props;
  const [field, , meta] = useField({ name, value: value || "" }); // Set a default value if 'value' is undefined
  const formikProps = useFormikContext();

  useEffect(() => {
    const stringValue = String(value || "");
    if (value && field.value !== stringValue) {
      meta.setValue(stringValue);
    }
     // eslint-disable-next-line
  }, [value]);

  return (
    <div className={cx("w-full")}>
      <MaskInput
        {...getFormikFieldValidationProps(formikProps, name)}
        {...field}
        {...rest}
        onAccept={(maskedValue: any, mask: any) => {
          if (rest?.onAccept) rest.onAccept(maskedValue, mask);
          else meta.setValue(mask.unmaskedValue);
        }}
        value={field.value || ""}
        label={label}
        autoComplete="off"
      />
      {getFormikFieldValidationProps(formikProps, name).helpertext?.props.children &&
        <Typography className="text-red-500">
          {getFormikFieldValidationProps(formikProps, name).helpertext?.props.children}
        </Typography>
      }

    </div>
  );
};

export default FormikMaskInput;
