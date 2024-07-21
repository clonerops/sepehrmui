import { useGetOrganizationBankList } from '../../app/modules/organizationBank/_hooks';
import { dropdownOrganzationBank } from '../helpers/Dropdowns';
import FormikSelect from './FormikSelect'

const FormikOrganzationBank = (props: any) => {
    const { data: OrganzationBank } = useGetOrganizationBankList();
    return (
        <FormikSelect
            options={dropdownOrganzationBank(OrganzationBank?.data)}
            {...props} />
    )
}

export default FormikOrganzationBank