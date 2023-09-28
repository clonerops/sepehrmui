import { http } from "../../../../_helpers/helpers/axiosConfig";
import { ILogin } from "./_models";

const login = async (formData: ILogin) => {
    try {
        const { data } = await http.post('/Account/authenticate', JSON.stringify(formData))
        return data
    } catch (error) {
        if(error instanceof Error)
            return error
    }
}

export {
    login
}