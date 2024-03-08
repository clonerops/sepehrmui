import { useField, useFormikContext } from "formik";
import { FC } from "react";
import { getFormikFieldValidationProps } from "../helpers/GetFormikFieldValidationProps";
import { SelectChangeEvent } from "@mui/material";

interface IProps {
  onChange?: any;
  name: string,
  id: string;
  key: string;
  disabled?: boolean;
  categories: {
    value: any,
    title: string,
    defaultChecked: boolean
  }[]
}

const RadioGroup: FC<IProps> = ({ onChange, name, id, key, categories, disabled, ...rest }) => {
  const [field] = useField({ name });
  const formikProps = useFormikContext();

  const handleSelectChange = (event: any) => {
    const selectedValue = event.target.value;
    if (onChange) {
      onChange(selectedValue);
    }
    formikProps.setFieldValue(name, selectedValue);
  };

  return (
    <div 
      {...field}
      {...rest}
      {...getFormikFieldValidationProps(formikProps, name)}
      key={key} 
      id={id} 
      onChange={handleSelectChange}  className='bg-[#F5F8FA] rounded-md w-fit'>
      {categories.map((category) => (
        <label className="mx-1 my-4">
          <input disabled={disabled} type='radio' className='hidden' name={id} value={category.value} defaultChecked={category.defaultChecked} />
          <span className="cursor-pointer inline-block px-4 py-2 my-1 rounded-sm bg-[#F5F8FA]">
            {category.title}
          </span>
        </label>
      ))}
    </div>
  );
};

export default RadioGroup;
