import FormikSelect from './FormikSelect'

import { dropdownShareholders } from '../../app/modules/managment-order/helpers/dropdowns';

import { useGetShareholderList } from '../../app/modules/generic/shareHolders/_hooks';

const FormikShareholders = (props: any) => {
    const { data: ShareholdersType, isLoading } = useGetShareholderList();

    if(isLoading) {
        return <span>درحال بارگزاری ....</span>
    }

    return (
        <FormikSelect
            options={dropdownShareholders(ShareholdersType)}
            {...props} />
    )
}

export default FormikShareholders