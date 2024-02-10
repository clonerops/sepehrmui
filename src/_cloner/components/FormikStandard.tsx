import FormikSelect from './FormikSelect'
import { useGetStandards } from '../../app/modules/generic/productStandard/_hooks';
import { IStandard } from '../../app/modules/generic/productStandard/_models';
import { dropdownStandard } from '../../app/modules/generic/productStandard/convertDropdown';

const FormikStandard = (props: any) => {
    const { data: productStandard } = useGetStandards();

    return (
        <FormikSelect
            options={dropdownStandard(productStandard?.data.filter((i: IStandard) => i.isActive))}
            {...props} />
    )
}

export default FormikStandard