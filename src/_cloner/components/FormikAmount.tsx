import FormikMaskInput from "./FormikMaskInput";


const FormikAmount = (props: any) => {

    return <FormikMaskInput
        mask={Number}
        thousandsSeparator=","
        {...props} />;
};

export default FormikAmount;
