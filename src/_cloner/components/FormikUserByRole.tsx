import { useEffect } from "react";
import { useGetUsersByMutation } from "../../app/modules/user/core/_hooks";
import { dropdownUser } from "../helpers/dropdowns";
import FormikComboBox from "./FormikComboBox";
import { useAuth } from "../helpers/checkUserPermissions";
import TypographyAccessDenied from "./TypographyAccessDenied";
// import FormikSelectCheckbox from "./FormikSelectCheckbox";
// import { useGetApplicationRoles } from "../../app/modules/groups/_hooks";

const FormikUserByRole = (props: any) => {
    const { hasPermission } = useAuth()
    // const roles = useGetApplicationRoles()
    const saleManagers = useGetUsersByMutation()

    useEffect(() => {
        
        const filters = {
            UserRoles: ["80d1aa8e-7fba-4ac0-a739-08dcd483a5fe"]
        }

        saleManagers.mutate(filters)

    }, [])

    if(!hasPermission("GetAllUsers"))
        return <TypographyAccessDenied title="جهت فیلتر لیست مسئولان، دسترسی به لیست تمامی کاربران الزامی است" />

    return (
        <>
            <div className="flex gap-x-4">
                <FormikComboBox
                    options={dropdownUser(saleManagers?.data?.data)}
                    {...props}
                />
            </div>
        </>
    );
};

export default FormikUserByRole;
