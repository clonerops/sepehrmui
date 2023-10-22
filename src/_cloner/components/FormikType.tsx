import FormikSelect from './FormikSelect'
import { useGetTypes } from '../../app/modules/generic/productType/_hooks';
import { dropdownTypes } from '../../app/modules/product/helpers/convertDropdowns';
import { IType } from '../../app/modules/generic/productType/_models';

const FormikType = (props: any) => {
    const { data: productType } = useGetTypes();

    return (
        <FormikSelect
            options={dropdownTypes(productType?.data.filter((i: IType) => i.isActive))}
            {...props} />
    )
}

export default FormikType