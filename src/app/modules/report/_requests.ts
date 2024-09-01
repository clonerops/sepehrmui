import { http } from "../../../_cloner/helpers/axiosConfig";
import { generateURLQueryParam } from "../../../_cloner/helpers/queryStringUrl";
import { ISaleReportFilter } from "./_models";

const getSaleReport = async (filters: ISaleReportFilter) => {
    try {
        const { data } = await http.get(`${generateURLQueryParam('/v1/SaleReport', filters)}`)
        return data

    } catch (error: any) {
        return error.response;
    }
}

export {
    getSaleReport
}