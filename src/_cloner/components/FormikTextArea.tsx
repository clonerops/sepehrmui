import { TextareaAutosize } from "@mui/material";
import * as React from "react";
import { TextareaAutosizeProps } from "@mui/base/TextareaAutosize/TextareaAutosize.types";
import { useField } from "formik";
import { useTranslation } from "react-i18next";

type Props = TextareaAutosizeProps & {
  value?: any;
  name: string;
};

const FormikTextArea = (props: Props) => {
  const { name, value, ...rest } = props;
  const [field] = useField({ name, value });
  const { t } = useTranslation();

  return (
    <TextareaAutosize
      placeholder={t("Description")}
      minRows={2}
      minLength={10}
      className={"focus:outline-primary border border-1 rounded-3 p-3 w-full"}
      {...field}
      {...rest}
    />
  );
};

export default FormikTextArea;
