import { useQuery } from "@tanstack/react-query"
import * as api from './_requests'

const useGetUnits = () => {
    return useQuery(['units'], () => api.getUnits())
}

export {
    useGetUnits
}