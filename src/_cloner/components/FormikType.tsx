import FormikSelect from './FormikSelect'
import { useGetTypes } from '../../app/modules/productType/_hooks';
import { IType } from '../../app/modules/productType/_models';
import { dropdownTypes } from '../helpers/Dropdowns';

const FormikType = (props: any) => {
    const { data: productType } = useGetTypes();

    return (
        <FormikSelect
            disabeld={props.disabled}
            options={dropdownTypes(productType?.data.filter((i: IType) => i.isActive))}
            {...props} />
    )
}

export default FormikType