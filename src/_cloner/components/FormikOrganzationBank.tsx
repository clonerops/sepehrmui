import { useGetOrganizationBankList } from '../../app/modules/generic/organizationBank/_hooks';
import { IOrganizationBank } from '../../app/modules/generic/organizationBank/_models';
import { dropdownOrganzationBank } from '../../app/modules/generic/organizationBank/convertDropdown';
import FormikSelect from './FormikSelect'

const FormikOrganzationBank = (props: any) => {
    const { data: OrganzationBank } = useGetOrganizationBankList();
    console.log(OrganzationBank)
    return (
        <FormikSelect
            options={dropdownOrganzationBank(OrganzationBank?.data)}
            {...props} />
    )
}

export default FormikOrganzationBank