import { http } from "../../../../_cloner/helpers/axiosConfig";
import { generateURLQueryParam } from "../../../../_cloner/helpers/queryStringUrl";
import { IBank } from "./_models";

const getProductList = async (formdata: IBank) => {
    try {
        const { data } = await http.get(`${generateURLQueryParam('/v1/Bank', formdata)}`)
        return data
    } catch (error: any) {
        return error.response;
    }

}

export {
    getProductList,
}