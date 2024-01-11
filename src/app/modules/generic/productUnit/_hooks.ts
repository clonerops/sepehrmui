import { useQuery } from "@tanstack/react-query"
import * as api from './_requests'

const useGetUnits = () => {
    return useQuery(['units'], () => api.getUnits(), {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false
    })
}

export {
    useGetUnits
}