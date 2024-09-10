import FormikComboBox from "./FormikComboBox";
import { useGetProductBrandsByMutation } from "../../app/modules/productBrands/_hooks";
import { dropdownProductBrand } from "../helpers/dropdowns";
import { useEffect, useState } from "react";


const FormikSearchableProductBrand = (props: any) => {
    const productBrandTools = useGetProductBrandsByMutation()

    const [keyword, setKeyword] = useState<string>("")

    useEffect(() => {
        if(keyword !== "" && keyword !== null && keyword !== ' ' && keyword !== undefined && keyword != "0") {
            const delayDebounceFn = setTimeout(() => {
                const filter = {
                    Keyword: keyword && keyword?.trim()
                }
                productBrandTools.mutate(filter);
            }, 500)
    
            return () => clearTimeout(delayDebounceFn)
        } 
        // eslint-disable-next-line
    }, [keyword])

    
    return <FormikComboBox
        disabled={props.disabled}
        placeholder={"jlkcsjaljad"}
        onInputChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e?.target.value)}
        noOptionsText={"جهت انتخاب کالابرند جستجو کنید ..."}
        options={dropdownProductBrand(productBrandTools?.data?.data) || []}
        {...props} />;
};

export default FormikSearchableProductBrand;
