import FormikSelect from './FormikSelect'
import { useGetStandards } from '../../app/modules/generic/productStandard/_hooks';
import { dropdownStandard } from '../../app/modules/product/helpers/convertDropdowns';
import { IStandard } from '../../app/modules/generic/productStandard/_models';

const FormikStandard = (props: any) => {
    const { data: productStandard } = useGetStandards();

    return (
        <FormikSelect
            options={dropdownStandard(productStandard?.data.filter((i: IStandard) => i.isActive))}
            {...props} />
    )
}

export default FormikStandard