import { useEffect } from "react";
import { useGetUsersByMutation } from "../../app/modules/user/core/_hooks";
import { dropdownUser } from "../helpers/dropdowns";
import FormikComboBox from "./FormikComboBox";
// import { useAuth } from "../helpers/checkUserPermissions";
import TypographyAccessDenied from "./TypographyAccessDenied";
// import FormikSelectCheckbox from "./FormikSelectCheckbox";
// import { useGetApplicationRoles } from "../../app/modules/groups/_hooks";

const FormikUserByRole = (props: any) => {
    // const { hasPermission } = useAuth()
    // const roles = useGetApplicationRoles()
    const saleManagers = useGetUsersByMutation()

    useEffect(() => {
        
        const filters = {
            // UserRoles: ["80d1aa8e-7fba-4ac0-a739-08dcd483a5fe"]
            UserRoles: ["F731900D-2B06-4DCA-30B6-08DCDD80EF4E", "14C716B8-EE03-42FA-30B7-08DCDD80EF4E"]
        }

        saleManagers.mutate(filters)

    }, [])

    // if(!hasPermission("GetAllUsers"))
    //     return <TypographyAccessDenied title="جهت فیلتر لیست مسئولان، دسترسی به لیست تمامی کاربران الزامی است" />

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
