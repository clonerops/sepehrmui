import { FC } from "react";

interface IProps {
  onChange: any;
  id: string;
  key: string;
}

const RadioGroup: FC<IProps> = ({ onChange, id, key }) => {
  return (
    <div key={key} id={id} onChange={onChange} className='bg-[#F5F8FA] rounded-md w-fit'>
      <label className="mx-1 my-4">
        <input type='radio' className='hidden' name={id} value={2} defaultChecked/>
        <span className="cursor-pointer inline-block px-4 py-2 my-1 rounded-sm bg-[#F5F8FA]">
          طبق برنامه
        </span>
      </label>
      <label className="mx-1 my-4">
        <input type='radio' className='hidden' name={id} value={0} />
        <span className="cursor-pointer inline-block px-4 py-2 my-1 rounded-sm bg-[#F5F8FA]">
          برای رزرو
        </span>
      </label>
      <label className="mx-1 my-4">
        <input type='radio' className='hidden' name={id} value={1} />
        <span className="cursor-pointer inline-block px-4 py-2 my-1 rounded-sm bg-[#F5F8FA]">
          برای انبار
        </span>
      </label>
    </div>
  );
};

export default RadioGroup;
