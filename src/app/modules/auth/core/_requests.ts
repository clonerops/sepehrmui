import { httpAuth } from "../../../../_cloner/helpers/axiosConfig";
import {
    ILoginUser,
} from "./_models";


const loginUser = async (formData: ILoginUser) => {
    try {
        const { data } = await httpAuth.post("/Auth",JSON.stringify(formData));
        return data;
        
    } catch (error: any) {
        return error.response
    }
};

const getCaptcha = async () => {
    try {
        const { data } = await httpAuth.get('/v1/Captcha')
        return data    
    } catch (error: any) {
        return error.response
    }
}

export {
    loginUser,
    getCaptcha
};
