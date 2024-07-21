import { useGetBrands } from '../../app/modules/brands/_hooks';
import { IBrand } from '../../app/modules/brands/_models';
import { dropdownBrand } from '../helpers/Dropdowns';
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