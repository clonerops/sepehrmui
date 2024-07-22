import { useGetAllApplicationMenus } from '../../app/modules/roleMenus/_hooks';
import { dropdownApplicationMenu } from '../helpers/Dropdowns';

import FormikSelect from './FormikSelect'


const FormikApplicationMenu = (props: any) => {
    const { data: menus, isLoading } = useGetAllApplicationMenus();

    if(isLoading) {
        return <span>درحال بارگزاری ....</span>
    }

    const combinedArray = [].concat(...menus.data.map((item: any) => item.children));

    return (
        <FormikSelect
            options={dropdownApplicationMenu(combinedArray)}
            {...props} />
    )
}

export default FormikApplicationMenu