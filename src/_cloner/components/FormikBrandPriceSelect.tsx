import FormikSelect from './FormikSelect'
import { useGetProductBrandsByProductId } from '../../app/modules/productBrands/_hooks'
import { dropdownBrandName } from '../helpers/dropdowns'

const FormikBrandPriceSelect = (props: any) => {
    const productBrandTools = useGetProductBrandsByProductId(props.productId)
    let data: any = []
    if(props.productId) data = productBrandTools?.data?.data
    
  return (
    <FormikSelect options={dropdownBrandName(data)}  {...props} />
  )
}

export default FormikBrandPriceSelect