import { useGetPettyCashList } from '../../app/modules/pettyCash/_hooks';
import { dropdownPettyCash } from '../helpers/dropdowns';
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