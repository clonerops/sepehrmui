import { useQuery } from "@tanstack/react-query";
import * as api from "./_requests";

const useGetRoles = () => {
    return useQuery(["roles"], () => api.getRoles(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    });
};




export {
    useGetRoles,
};
