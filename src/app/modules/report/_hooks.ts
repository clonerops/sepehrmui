import { useMutation } from '@tanstack/react-query'
import * as api from './_requests'
import { ISaleReportFilter } from './_models'

const useGetSaleReport = () => {
    return useMutation((filters: ISaleReportFilter) => {
        return api.getSaleReport(filters);
    })
}

export {
    useGetSaleReport
}