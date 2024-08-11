import FormikSelect from './FormikSelect'
import { useGetStates } from '../../app/modules/productState/_hooks';
import { IState } from '../../app/modules/productState/_models';
import { dropdownState } from '../helpers/dropdowns';

const FormikState = (props: any) => {
    const { data: productState } = useGetStates();

    return (
        <FormikSelect
            options={dropdownState(productState?.data.filter((i: IState) => i.isActive))}
            {...props} />
    )
}

export default FormikState