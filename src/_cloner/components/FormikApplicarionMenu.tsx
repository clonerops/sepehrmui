import { useEffect, useState } from 'react';
import { useGetAllApplicationMenus } from '../../app/modules/access/menus/_hooks';
import { dropdownApplicationMenu } from '../../app/modules/access/permissions/_functions';

import FormikSelect from './FormikSelect'


const FormikApplicationMenu = (props: any) => {
    const { data: menus, isLoading } = useGetAllApplicationMenus();

    if(isLoading) {
        return <span>درحال بارگزاری ....</span>
    }

    const combinedArray = [].concat(...menus.data.map((item: any) => item.children));

    console.log(combinedArray)

    return (
        <FormikSelect
            options={dropdownApplicationMenu(combinedArray)}
            {...props} />
    )
}

export default FormikApplicationMenu