import { useGetOrganizationBankList } from '../../app/modules/generic/organizationBank/_hooks';
import { dropdownOrganzationBank } from '../../app/modules/generic/organizationBank/convertDropdown';
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