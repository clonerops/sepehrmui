import FormikSelect from './FormikSelect'
import { ICost } from '../../app/modules/generic/cost/_models';
import { dropdownCost } from '../../app/modules/generic/cost/convertDropdown';
import { useGetCosts } from '../../app/modules/generic/cost/_hooks';

const FormikCost = (props: any) => {
    const { data: cost } = useGetCosts();

    return (
        <FormikSelect
            options={dropdownCost(cost?.data.filter((i: ICost) => i.isActive))}
            {...props} />
    )
}

export default FormikCost