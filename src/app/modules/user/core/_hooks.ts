import { useMutation, useQuery } from "@tanstack/react-query";
import * as api from "./_requests";
import { IForgetPasswordRequest, IUser, IUserFilter } from "./_models";

const useRegisterUser = () => {
    return useMutation((formData: IUser) => {
        return api.registerUser(formData);
    });
};

const useUsers = () => useQuery(["users"], () => api.fetchUsers(), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false
});
const useGetUsersByMutation = () => {
    return useMutation((filters: IUserFilter) => {
        return api.getUsersByMutation(filters)
    })
};
const useUserInfo = () => useQuery(["userInfo"], () => api.fetchUserInfo(), {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false
});

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

const useForgetPasswordRequest = () => {
    return useMutation((formData: IForgetPasswordRequest) => {
        return api.forgetPasswordRequest(formData)
    })
}

export { useRegisterUser, useUsers, useGetUsersByMutation, useGetUserDetail, useGetUpdateUser, useGetDeleteUser, useUserInfo, useForgetPasswordRequest };
