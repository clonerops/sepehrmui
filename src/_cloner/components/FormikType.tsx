import FormikSelect from './FormikSelect'
import { useGetTypes } from '../../app/modules/generic/productType/_hooks';
import { IType } from '../../app/modules/generic/productType/_models';
import { dropdownTypes } from '../../app/modules/generic/productType/convertDropdown';

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