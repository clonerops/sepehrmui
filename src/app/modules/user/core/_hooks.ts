import { useMutation, useQuery } from "@tanstack/react-query";
import * as api from "./_requests";
import { IUser } from "./_models";

const useRegisterUser = () => {
    return useMutation((formData: IUser) => {
        return api.registerUser(formData);
    });
};

const useUsers = () => useQuery(["users"], () => api.fetchUsers());

export { useRegisterUser, useUsers };
