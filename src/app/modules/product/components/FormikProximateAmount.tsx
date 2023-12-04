import { useFormikContext } from "formik";
import FormikInput from "../../../../_cloner/components/FormikInput";


const FormikProximateAmount = (props: any) => {
    const formikProps: any = useFormikContext();

    const onInput = (event: React.ChangeEvent<HTMLInputElement>,) => {
        const inputValue = event.target.value.replace(/[^0-9]/g, "");
        const formattedValue = inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        event.target.value = formattedValue;
        formikProps.setFieldValue(props.name, inputValue);
        if(formikProps?.values?.exchangeRate) {
            formikProps.setFieldValue("proximateSubUnit", Math.ceil(+inputValue / +formikProps?.values?.exchangeRate))
        } else {
            formikProps.setFieldValue("proximateSubUnit", Math.ceil(+inputValue / +formikProps?.values?.productName.exchangeRate))
        }
    };

    return <FormikInput InputProps={props.InputProps} onInput={onInput} {...props} />;
};

export default FormikProximateAmount;
