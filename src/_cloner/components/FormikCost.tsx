import FormikSelect from './FormikSelect'
import { ICost } from '../../app/modules/cost/_models';
import { dropdownCost } from '../../app/modules/cost/convertDropdown';
import { useGetCosts } from '../../app/modules/cost/_hooks';

const FormikCost = (props: any) => {
    const { data: cost } = useGetCosts();

    return (
        <FormikSelect
            options={dropdownCost(cost?.data.filter((i: ICost) => i.isActive))}
            {...props} />
    )
}

export default FormikCost