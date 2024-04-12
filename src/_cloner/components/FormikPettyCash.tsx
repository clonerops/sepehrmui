import { useGetPettyCashList } from '../../app/modules/generic/pettyCash/_hooks';
import { IPettyCash } from '../../app/modules/generic/pettyCash/_models';
import { dropdownPettyCash } from '../../app/modules/generic/pettyCash/convertDropdown';
import FormikSelect from './FormikSelect'

const FormikPettyCash = (props: any) => {
    const { data: PettyCash } = useGetPettyCashList();
    console.log(PettyCash)
    return (
        <FormikSelect
            options={dropdownPettyCash(PettyCash?.data)}
            {...props} />
    )
}

export default FormikPettyCash