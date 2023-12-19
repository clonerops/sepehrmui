import { http } from "../../../../_cloner/helpers/axiosConfig";

const postApplicationRoles = async (formdata: IRoleGroup) => {
    try {
        const { data } = await http.post(
            "/v1/ApplicationRole",
            JSON.stringify(formdata)
        );
        return data;
    } catch (error: any) {
        return error.response;
    }
};
const getApplicationRoles = async () => {
    try {
        const { data } = await http.get("/v1/ApplicationRole");
        return data;
    } catch (error: any) {
        return error.response;
    }
};

const deleteApplicationRoles = async (id: string) => {
    try {
        const { data } = await http.delete(`/v1/ApplicationRole/${id}`);
        return data;
    } catch (error: any) {
        return error.response;
    }
};


export {
    postApplicationRoles,
    getApplicationRoles,
    deleteApplicationRoles
}