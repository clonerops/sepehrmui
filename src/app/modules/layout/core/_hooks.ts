import { useQuery } from "@tanstack/react-query";
import { getMenuItems } from "./_requests";

export const useMenuItems = () => useQuery(["menuItems"], () => getMenuItems(),  {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false
});
