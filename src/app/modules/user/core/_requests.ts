import { http } from "../../../../_cloner/helpers/axiosConfig";
import { IUser } from "./_models";

const registerUser = async (formData: IUser) => {
    try {
        const { data } = await http.post("/Account/register",JSON.stringify(formData));
        return data
    } catch (error: any) {
        return error.response
    }
};


const fetchUsers = async () => {
  return await http.get("/Account").then((res) => res?.data);
};


export { registerUser, fetchUsers }
