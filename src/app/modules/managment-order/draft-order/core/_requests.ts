import { http } from "../../../../../_cloner/helpers/axiosConfig";
import { generateURLQueryParam } from "../../../../../_cloner/helpers/queryStringUrl";
import { IDraftOrderFilter, IPostDraftOrder } from "./_models";

const postDraftOrder = async (formData: IPostDraftOrder) => {
    try {
    
        const { data } = await http.post("/v1/DraftOrder", JSON.stringify(formData))
        return data
    
    } catch (error: any) {
        return error.response
    }
}

const getAllDraftOrder = async (filters: IDraftOrderFilter) => {
    try {
    
        const { data } = await http.get(`${generateURLQueryParam("/v1/DraftOrder", filters)}`)
        return data
    
    } catch (error: any) {
        return error.response
    }

}

export {
    postDraftOrder,
    getAllDraftOrder
}