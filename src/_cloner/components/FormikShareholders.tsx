import FormikSelect from './FormikSelect'

import { useGetShareholderListWithQuery } from '../../app/modules/shareHolders/_hooks';
import { dropdownShareholders } from '../helpers/dropdowns';

const FormikShareholders = (props: any) => {
    const { data: ShareholdersType, isLoading } = useGetShareholderListWithQuery();

    if(isLoading) {
        return <span>درحال بارگزاری ....</span>
    }
    return (
        <FormikSelect
            options={dropdownShareholders(ShareholdersType?.data)}
            {...props} />
    )
}

export default FormikShareholders