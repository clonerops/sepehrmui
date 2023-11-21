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
  const [field, , meta] = useField({ name: name, value: value });
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
      onAccept={(value, mask) => {
        if (rest?.onAccept) rest?.onAccept(value, mask);
        else meta.setValue(mask.unmaskedValue);
      }}
      value={field.value || undefined}
    />
  );
};

export default FormikMaskInput;
