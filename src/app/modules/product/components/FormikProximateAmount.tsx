import { useFormikContext } from "formik";
import FormikInput from "../../../../_cloner/components/FormikInput";


const FormikProximateAmount = (props: any) => {
    const formikProps = useFormikContext();


    const onInput = (event: React.ChangeEvent<HTMLInputElement>, ) => {
        const inputValue = event.target.value.replace(/[^0-9]/g, "");
        const formattedValue = inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        event.target.value = formattedValue;
        formikProps.setFieldValue(props.name, inputValue);
        formikProps.setFieldValue("proximateSubUnit", Number(inputValue) / Number(props.exchangeRate ? props.exchangeRate : 0));
    };

    return <FormikInput InputProps={props.InputProps} onInput={onInput} {...props} />;
};

export default FormikProximateAmount;