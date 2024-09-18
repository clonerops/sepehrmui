import FormikSelect from "./FormikSelect";
import { useGetProductTypes } from "../../app/modules/generic/_hooks";
import { IProductType } from "../../app/modules/generic/_models";
import { dropdownTypes } from "../helpers/dropdowns";
import { useAuth } from "../helpers/checkUserPermissions";

const FormikPeoductType = (props: any) => {
    const { hasPermission } = useAuth()

    const { data: productType } = useGetProductTypes(hasPermission("GetProductTypes"));

    return (
        <FormikSelect
            options={
                productType === undefined
                    ? [{ value: -1, label: "همه" }]
                    : dropdownTypes([
                          { id: -1, desc: "همه" },
                          ...productType.filter((i: IProductType) => i.isActive),
                      ])
            }
            {...props}
        />
    );
};

export default FormikPeoductType;
