import { useMutation, useQuery } from "@tanstack/react-query";
import * as api from "./_requests";
import { IUser } from "./_models";

const useRegisterUser = () => {
    return useMutation((formData: IUser) => {
        return api.registerUser(formData);
    });
};

const useUsers = () => useQuery(["users"], () => api.fetchUsers());

const useGetUserDetail = () => {
    return useMutation((id: string) => {
        return api.getUserDetail(id)
    })
}

const useGetUpdateUser = () => {
    return useMutation((formData: IUser) => {
        return api.updateUser(formData)
    })
}

const useGetDeleteUser = () => {
    return useMutation((id: string) => {
        return api.deleteUser(id)
    })
}

export { useRegisterUser, useUsers, useGetUserDetail, useGetUpdateUser, useGetDeleteUser };
