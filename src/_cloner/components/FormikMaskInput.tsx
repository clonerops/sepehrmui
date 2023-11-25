import MaskInput from "./MaskInput";
import { ComponentProps, useEffect } from "react";
import { useField, useFormikContext } from "formik";
import { getFormikFieldValidationProps } from "../helpers/GetFormikFieldValidationProps";

export type FormikMaskProps = ComponentProps<typeof MaskInput> & {
  name: string;
  value?: string;
};

const FormikMaskInput = (props: FormikMaskProps) => {
  const { name, value, ...rest } = props;
  const [field, , meta] = useField({ name, value: value || "" }); // Set a default value if 'value' is undefined
  const formikProps = useFormikContext();

  useEffect(() => {
    const stringValue = String(value || "");
    if (value && field.value !== stringValue) {
      meta.setValue(stringValue);
    }
  }, [value]);

  return (
    <MaskInput
      {...getFormikFieldValidationProps(formikProps, name)}
      {...field}
      {...rest}
      onAccept={(maskedValue: any, mask: any) => {
        if (rest?.onAccept) rest.onAccept(maskedValue, mask);
        else meta.setValue(mask.unmaskedValue);
      }}
      value={field.value || ""} // Set a default value if 'field.value' is undefined
    />
  );
};

export default FormikMaskInput;
