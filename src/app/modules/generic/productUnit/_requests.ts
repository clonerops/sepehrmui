import { http } from "../../../../_cloner/helpers/axiosConfig";

const getUnits = async () => {
    try {

        const { data } = await http.get('/v1/ProductUnit')
        return data;

    } catch (error: any) {
        return error.response
    }
}

export {
    getUnits
}