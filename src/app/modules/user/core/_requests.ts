import { http, httpAuth } from "../../../../_cloner/helpers/axiosConfig";
import { generateURLQueryParam } from "../../../../_cloner/helpers/queryStringUrl";
import { IChangePassword, IForgetPasswordRequest, IUser, IUserFilter } from "./_models";

const registerUser = async (formData: IUser) => {
    try {
        const { data } = await http.post("/v1/ApplicationUser", JSON.stringify(formData));
        return data
    } catch (error: any) {
        return error.response
    }
};


const fetchUsers = async () => {
    return await http.get("/v1/ApplicationUser").then((res) => res?.data);
};

const getUsersByMutation = async (filters: IUserFilter) => {
    try {

        const { data } = await http.get(`${generateURLQueryParam('/v1/ApplicationUser', filters)}`)
        return data

    } catch (error: any) {
        return error.data
    }
};


const fetchUserInfo = async () => {
    return await http.get("/v1/ApplicationUser/GetUserInfo").then((res) => res?.data);
};


const getUserDetail = async (id: string) => {
    try {
        const { data } = await http.get(`/v1/ApplicationUser/${id}`)
        return data
    } catch (error: any) {
        return error.response;
    }
}

const updateUser = async (formData: IUser) => {
    try {
        const { data } = await http.put(`/v1/ApplicationUser/${formData.id}`, JSON.stringify(formData))
        return data
    } catch (error: any) {
        return error.response;
    }

}

const deleteUser = async (id: string) => {
    try {
        const { data } = await http.delete(`/v1/ApplicationUser/${id}`)
        return data
    } catch (error: any) {
        return error.response;
    }
}

const forgetPasswordRequest = async (formData: IForgetPasswordRequest) => {
    try {
        const { data } = await httpAuth.post('/v1/ApplicationUser/ForgetPasswordRequest', JSON.stringify(formData))
        return data
    } catch (error: any) {
        return error.response
    }
}

const changePasswordRequest = async (formData: IChangePassword) => {
    try {
        const { data } = await httpAuth.post('/v1/ApplicationUser/ChangePasswordRequest', JSON.stringify(formData))
        return data
    } catch (error: any) {
        return error.response
    }
}



export {
    registerUser,
    fetchUsers,
    getUsersByMutation,
    getUserDetail,
    updateUser,
    deleteUser,
    fetchUserInfo,
    forgetPasswordRequest,
    changePasswordRequest
}
