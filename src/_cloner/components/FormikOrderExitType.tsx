import FormikSelect from './FormikSelect'

import { dropdownOrderExitType } from '../../app/modules/managment-order/helpers/dropdowns';

import { useGetOrderExitTypes } from '../../app/modules/generic/_hooks';

const FormikOrderExitType = (props: any) => {
    const {data} = useGetOrderExitTypes()

    return (
        <FormikSelect
            options={dropdownOrderExitType(data)}
            {...props} />
    )
}

export default FormikOrderExitType