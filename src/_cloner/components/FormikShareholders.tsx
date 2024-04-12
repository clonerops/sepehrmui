import FormikSelect from './FormikSelect'

import { dropdownShareholders } from '../../app/modules/managment-order/helpers/dropdowns';

import { useGetShareholderListWithQuery } from '../../app/modules/generic/shareHolders/_hooks';

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