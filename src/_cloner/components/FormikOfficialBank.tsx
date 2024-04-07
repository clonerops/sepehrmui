import { useGetOfficialBank } from '../../app/modules/generic/_hooks';
import { IOfficialBank } from '../../app/modules/generic/_models';
import { dropdownOfficialBank } from '../../app/modules/managment-order/helpers/dropdowns';
import FormikSelect from './FormikSelect'

const FormikOfficialBank = (props: any) => {
    const { data: OfficialBank } = useGetOfficialBank();

    return (
        <FormikSelect
            options={dropdownOfficialBank(OfficialBank?.filter((i: IOfficialBank) => i.isActive))}
            {...props} />
    )
}

export default FormikOfficialBank