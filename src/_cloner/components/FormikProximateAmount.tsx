import { useFormikContext } from "formik";
import FormikInput from "./FormikInput";
import FormikMaskInput from "./FormikMaskInput";
import FormikPrice from "./FormikPrice";


const FormikProximateAmount = (props: any) => {
    const formikProps: any = useFormikContext();

    const onInput = (event: React.ChangeEvent<HTMLInputElement>,) => {
        const inputValue = event.target.value.replace(/[^0-9]/g, "");
        const formattedValue = inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        event.target.value = formattedValue;
        formikProps.setFieldValue(props.name, inputValue);
        if(formikProps?.values?.productId?.exchangeRate) {
            formikProps.setFieldValue("productSubUnitAmount", Math.ceil(+inputValue / +formikProps?.values?.productId?.exchangeRate))
        } else if(formikProps?.values?.exchangeRate){
            formikProps.setFieldValue("productSubUnitAmount", Math.ceil(+inputValue / +formikProps?.values?.exchangeRate))
        } else {
            formikProps.setFieldValue("productSubUnitAmount", Math.ceil(+inputValue / +formikProps?.values?.productId?.exchangeRate))
        }
    };

    // return <FormikInput InputProps={props.InputProps} onInput={onInput} {...props} />;
    // return <FormikMaskInput mask={Number} thousandsSeparator="," InputProps={props.InputProps} onInput={onInput} {...props} />;
    return <FormikPrice InputProps={props.InputProps} onInput={onInput} {...props} />;
};

export default FormikProximateAmount;
