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


export { registerUser, fetchUsers }
