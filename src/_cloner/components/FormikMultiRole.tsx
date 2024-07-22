
import { useGetApplicationRoles } from '../../app/modules/groups/_hooks';
import { dropdownRole } from '../helpers/Dropdowns';

import FormikSelect from './FormikSelect'


const FormikMultiRole = (props: any) => {
    const { data: roles, isLoading } = useGetApplicationRoles();

    if(isLoading) {
        return <span>درحال بارگزاری ....</span>
    }
    
    return (
        <FormikSelect
            options={dropdownRole(roles?.data || [])}
            multiple
            {...props} />
    )
}

export default FormikMultiRole