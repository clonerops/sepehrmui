import { useMutation, useQuery } from "@tanstack/react-query";
import * as api from "./_requests";
import {
    ILoginUser,
} from "./_models";


const useLoginUser = () => {
    return useMutation((formData: ILoginUser) => {
        return api.loginUser(formData);
    });
};


const useGetCaptcha = () => {
    return useQuery(['captcha'], () => api.getCaptcha())
}

export {
    useLoginUser,
    useGetCaptcha
};
