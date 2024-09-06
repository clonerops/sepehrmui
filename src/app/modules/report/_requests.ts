import { http } from "../../../_cloner/helpers/axiosConfig";
import { generateURLQueryParam } from "../../../_cloner/helpers/queryStringUrl";
import { IReportFilter } from "./_models";

const getSaleReportByProductType = async (filters: IReportFilter) => {
    try {
        const { data } = await http.get(`${generateURLQueryParam('/v1/SaleReport/GetSaleReportByProductType', filters)}`)
        return data

    } catch (error: any) {
        return error.response;
    }
}
const getSaleStatusDiagram = async (filters: IReportFilter) => {
    try {
        const { data } = await http.get(`${generateURLQueryParam('/v1/SaleReport/GetSaleStatusDiagram', filters)}`)
        return data

    } catch (error: any) {
        return error.response;
    }
}

export {
    getSaleReportByProductType,
    getSaleStatusDiagram,
}