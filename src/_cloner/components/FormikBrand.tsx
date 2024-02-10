import { dropdownBrand } from '../../app/modules/generic/_functions';
import { useGetBrands } from '../../app/modules/generic/brands/_hooks';
import { IBrand } from '../../app/modules/generic/brands/_models';
import FormikSelect from './FormikSelect'

const FormikBrand = (props: any) => {
    const { data: brands } = useGetBrands();

    return (
        <FormikSelect
            options={dropdownBrand(brands?.data.filter((i: IBrand) => i.isActive))}
            {...props} />
    )
}

export default FormikBrand