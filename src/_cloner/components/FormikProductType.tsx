import FormikSelect from "./FormikSelect";
import { useGetProductTypes } from "../../app/modules/generic/_hooks";
import { IProductType } from "../../app/modules/generic/_models";
import { dropdownTypes } from "../../app/modules/generic/productType/convertDropdown";

const FormikPeoductType = (props: any) => {
    const { data: productType } = useGetProductTypes();

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
            // options={dropdownTypes(
            //     productType?.filter((i: IProductType) => i.isActive)
            // )}
            {...props}
        />
    );
};

export default FormikPeoductType;
