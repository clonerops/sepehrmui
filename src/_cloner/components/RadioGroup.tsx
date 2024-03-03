import { FC } from "react";

interface IProps {
  onChange: any;
  id: string;
  key: string;
  categories: {
    value: any,
    title: string,
    defaultChecked: boolean
  }[]
}

const RadioGroup: FC<IProps> = ({ onChange, id, key, categories }) => {
  return (
    <div key={key} id={id} onChange={onChange} className='bg-[#F5F8FA] rounded-md w-fit'>
      {categories.map((category) => (
        <label className="mx-1 my-4">
          <input type='radio' className='hidden' name={id} value={category.value} defaultChecked={category.defaultChecked} />
          <span className="cursor-pointer inline-block px-4 py-2 my-1 rounded-sm bg-[#F5F8FA]">
            {category.title}
          </span>
        </label>
      ))}
    </div>
  );
};

export default RadioGroup;
