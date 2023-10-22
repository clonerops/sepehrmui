import FormikSelect from './FormikSelect'
import { useGetStates } from '../../app/modules/generic/productState/_hooks';
import { dropdownState } from '../../app/modules/product/helpers/convertDropdowns';
import { IState } from '../../app/modules/generic/productState/_models';

const FormikState = (props: any) => {
    const { data: productState } = useGetStates();

    return (
        <FormikSelect
            options={dropdownState(productState?.data.filter((i: IState) => i.isActive))}
            {...props} />
    )
}

export default FormikState