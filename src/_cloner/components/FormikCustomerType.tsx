import { customerType } from '../../app/modules/customer/helpers/customerType';
import FormikSelect from './FormikSelect'

const FormikCustomerType = (props: any) => {
    return (
        <FormikSelect
            options={customerType}
            {...props} />
    )
}

export default FormikCustomerType