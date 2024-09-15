import { useEffect } from "react";
import { useGetUsersByMutation } from "../../app/modules/user/core/_hooks";
import { dropdownRole, dropdownUser } from "../helpers/dropdowns";
import FormikComboBox from "./FormikComboBox";
import FormikSelectCheckbox from "./FormikSelectCheckbox";
import { useGetApplicationRoles } from "../../app/modules/groups/_hooks";

const FormikUserByRole = (props: any) => {
    const roles = useGetApplicationRoles()
    const saleManagers = useGetUsersByMutation()

    useEffect(() => {
        
        const filters = {
            UserRoles: props.values.Roles
        }

        saleManagers.mutate(filters)

    }, [props.values.Roles])


    return (
        <>
            <div>
                <FormikSelectCheckbox
                    options={dropdownRole(roles?.data?.data)}
                    name="Roles"
                    label="گروه ها"
                />
            </div>

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
