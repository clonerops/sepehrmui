import FormikSelect from './FormikSelect'

import { useGetOrderExitTypes } from '../../app/modules/generic/_hooks';
import { dropdownOrderExitType } from '../helpers/dropdowns';

const FormikOrderExitType = (props: any) => {
    const {data} = useGetOrderExitTypes()

    return (
        <FormikSelect
            options={dropdownOrderExitType(data)}
            {...props} />
    )
}

export default FormikOrderExitType