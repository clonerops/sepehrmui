import React from 'react'
import FormikSelect from '../../../../_cloner/components/FormikSelect'
import { useGetProductBrandsByProductId } from '../../generic/productBrands/_hooks'
import { dropdownBrand, dropdownBrandName } from '../../generic/_functions'

const FormikBrandPriceSelect = (props: any) => {
    const productBrandTools = useGetProductBrandsByProductId(props.productId)
    let data: any = []
    if(props.productId) data = productBrandTools?.data?.data
    
  return (
    <FormikSelect options={dropdownBrandName(data)}  {...props} />
  )
}

export default FormikBrandPriceSelect