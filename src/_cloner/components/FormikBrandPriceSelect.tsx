import React from 'react'
import FormikSelect from './FormikSelect'
import { useGetProductBrandsByProductId } from '../../app/modules/generic/productBrands/_hooks'
import { dropdownBrand, dropdownBrandName } from '../../app/modules/generic/_functions'

const FormikBrandPriceSelect = (props: any) => {
    const productBrandTools = useGetProductBrandsByProductId(props.productId)
    let data: any = []
    if(props.productId) data = productBrandTools?.data?.data
    
  return (
    <FormikSelect options={dropdownBrandName(data)}  {...props} />
  )
}

export default FormikBrandPriceSelect