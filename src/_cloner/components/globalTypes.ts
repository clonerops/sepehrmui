import { Label } from "./FormikInput";

export type FieldType = {
  label: Label;
  name: string;
  type?: string;
  [key: string]: any;
};
