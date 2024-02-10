import FormikSelect from './FormikSelect'
import { useGetStates } from '../../app/modules/generic/productState/_hooks';
import { IState } from '../../app/modules/generic/productState/_models';
import { dropdownState } from '../../app/modules/generic/productState/convertDropdown';

const FormikState = (props: any) => {
    const { data: productState } = useGetStates();

    return (
        <FormikSelect
            options={dropdownState(productState?.data.filter((i: IState) => i.isActive))}
            {...props} />
    )
}

export default FormikState