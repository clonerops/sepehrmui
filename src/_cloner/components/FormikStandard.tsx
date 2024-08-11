import { useGetStandards } from '../../app/modules/productStandard/_hooks';
import { IStandard } from '../../app/modules/productStandard/_models';
import { dropdownStandard } from '../helpers/dropdowns';
import FormikSelect from './FormikSelect'

const FormikStandard = (props: any) => {
    const { data: productStandard } = useGetStandards();

    return (
        <FormikSelect
            options={dropdownStandard(productStandard?.data.filter((i: IStandard) => i.isActive))}
            {...props} />
    )
}

export default FormikStandard