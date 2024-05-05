import { useFormikContext } from "formik";
import FormikInput from "./FormikInput";


const FormikPrice = (props: any) => {
    const formikProps: any = useFormikContext();


    const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value.replace(/[^0-9]/g, "");
        const formattedValue = inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        event.target.value = formattedValue;
        formikProps.setFieldValue(props.name, inputValue);

        if (props.onChange) {
            props.onChange(formikProps.values[props.name]);
        }
    };

    return <FormikInput autoComplete="off" disabled={props.disabled} InputProps={props.InputProps} onInput={onInput} {...props} />;
};

export default FormikPrice;
