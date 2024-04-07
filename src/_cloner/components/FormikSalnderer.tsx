import FormikSelect from './FormikSelect'
import { ISlanderer } from '../../app/modules/generic/slanderer/_models';
import { useGetSlandererList } from '../../app/modules/generic/slanderer/_hooks';
import { dropdownSlanderer } from '../../app/modules/generic/slanderer/convertDropdown';

const FormikSlanderer = (props: any) => {
    const { data: Slanderer } = useGetSlandererList();

    return (
        <FormikSelect
            options={dropdownSlanderer(Slanderer?.data.filter((i: ISlanderer) => i.isActive))}
            {...props} />
    )
}

export default FormikSlanderer