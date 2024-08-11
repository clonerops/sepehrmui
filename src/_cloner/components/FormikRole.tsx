
import { useGetApplicationRoles } from '../../app/modules/groups/_hooks';
import { dropdownRole } from '../helpers/dropdowns';

import FormikSelect from './FormikSelect'


const FormikRole = (props: any) => {
    const { data: roles, isLoading } = useGetApplicationRoles();

    if(isLoading) {
        return <span>درحال بارگزاری ....</span>
    }

    return (
        <FormikSelect
            options={dropdownRole(roles?.data)}
            {...props} />
    )
}

export default FormikRole