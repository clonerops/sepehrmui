import { http } from "../../../_cloner/helpers/axiosConfig";

const getRoles = async () => {
    const { data } = await http.get("/Account/GetAllRoles");
    return data;
};


export {
    getRoles,
};
