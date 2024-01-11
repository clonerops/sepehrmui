import { http } from "../../../../_cloner/helpers/axiosConfig";
import { IUser } from "./_models";

const registerUser = async (formData: IUser) => {
    try {
        const { data } = await http.post("/v1/ApplicationUser",JSON.stringify(formData));
        return data
    } catch (error: any) {
        return error.response
    }
};


const fetchUsers = async () => {
  return await http.get("/v1/ApplicationUser").then((res) => res?.data);
};
const fetchUserInfo = async () => {
  return await http.get("/v1/ApplicationUser/GetUserInfo").then((res) => res?.data);
};


const getUserDetail = async (id: string) => {
    try {
        const {data} = await http.get(`/v1/ApplicationUser/${id}`)
        return data
    } catch (error: any) {
        return error.response;
    }
}

const updateUser = async (formData: IUser) => {
    try {
        const {data} = await http.put(`/v1/ApplicationUser/${formData.id}`, JSON.stringify(formData))
        return data
    } catch (error: any) {
        return error.response;
    }

}

const deleteUser = async (id: string) => {
    try {
        const {data} = await http.delete(`/v1/ApplicationUser/${id}`)
        return data
    } catch (error: any) {
        return error.response;
    }
}


export { registerUser, fetchUsers, getUserDetail, updateUser, deleteUser, fetchUserInfo }
