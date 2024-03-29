import { useGetApplicationRoles } from '../../app/modules/access/roles/core/_hooks';

import { dropdownRole } from '../../app/modules/managment-order/helpers/dropdowns';

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