import { useMutation } from '@tanstack/react-query'
import * as api from './_requests'
import { IReportFilter } from './_models'

const useGetSaleReportByProductType = () => {
    return useMutation((filters: IReportFilter) => {
        return api.getSaleReportByProductType(filters);
    })
}
const useGetSaleStatusDiagram = () => {
    return useMutation((filters: IReportFilter) => {
        return api.getSaleStatusDiagram(filters);
    })
}

export {
    useGetSaleReportByProductType,
    useGetSaleStatusDiagram
}