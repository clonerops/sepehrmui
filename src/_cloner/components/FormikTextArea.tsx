import { TextareaAutosize } from "@mui/material";
import { TextareaAutosizeProps } from "@mui/base/TextareaAutosize/TextareaAutosize.types";
import { useField } from "formik";

type Props = TextareaAutosizeProps & {
  value?: any;
  name: string;
  label: string;
};

const FormikTextArea = (props: Props) => {
  const { name, value,label, ...rest } = props;
  const [field] = useField({ name, value });

  return (
    <TextareaAutosize
      placeholder={label}
      minRows={2}
      minLength={10}
      className={"focus:outline-primary border border-1 rounded-3 p-3 w-full"}
      {...field}
      {...rest}
    />
  );
};

export default FormikTextArea;
