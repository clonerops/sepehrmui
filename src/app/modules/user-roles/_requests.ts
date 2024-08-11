import { http } from "../../../_cloner/helpers/axiosConfig";
import { IUserRole } from "./_models";

const getUserRoles = async (id: string) => {
    try {
        const {data} = await http.get(`/v1/UserRole?userId=${id}`)
        return data
    } catch (error: any) {
        return error.response;
    }
}

const postUserRoles = async (formData: IUserRole) => {
    try {
        const {data} = await http.post('/v1/UserRole', JSON.stringify(formData))
        return data
    } catch (error: any) {
        return error.response;
    }
}


const deleteUserRoles = async (formData: IUserRole) => {
    try {
        const {data} = await http.delete(`/v1/UserRole/${formData.userId}?userId=${formData.userId}&roleId=${formData.roleId}`)
        return data
    } catch (error: any) {
        return error.response
    }
}

export {
    getUserRoles,
    postUserRoles,
    deleteUserRoles,
}