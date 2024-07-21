import { useGetPettyCashList } from '../../app/modules/pettyCash/_hooks';
import { dropdownPettyCash } from '../../app/modules/pettyCash/convertDropdown';
import FormikSelect from './FormikSelect'

const FormikPettyCash = (props: any) => {
    const { data: PettyCash } = useGetPettyCashList();
    return (
        <FormikSelect
            options={dropdownPettyCash(PettyCash?.data)}
            {...props} />
    )
}

export default FormikPettyCash