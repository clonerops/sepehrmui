import FormikSelect from './FormikSelect'

import { useGetOrderExitTypes } from '../../app/modules/generic/_hooks';
import { dropdownOrderExitType } from '../helpers/dropdowns';
import { useAuth } from '../helpers/checkUserPermissions';

const FormikOrderExitType = (props: any) => {
    const {hasPermission} = useAuth()
    const {data} = useGetOrderExitTypes(hasPermission("GetOrderExitTypes"))

    return (
        <FormikSelect
            options={dropdownOrderExitType(data)}
            {...props} />
    )
}

export default FormikOrderExitType