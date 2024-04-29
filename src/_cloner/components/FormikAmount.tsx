import FormikMaskInput from "./FormikMaskInput";


const FormikAmount = (props: any) => {

    return <FormikMaskInput
        mask={Number}
        autoComplete={false}
        thousandsSeparator=","
        {...props} />;
};

export default FormikAmount;
