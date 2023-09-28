import { Box, Button, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import FormikInput from "../../../_helpers/components/FormikInput";
import { FieldType } from "../../../_helpers/components/globalTypes";
import { useTranslation } from "react-i18next";
import { LockResetRounded } from "@mui/icons-material";
import { ChangePassValidation } from "./validation/validation";

const formFields: FieldType[] = [
  { label: "Prev_Pass", name: "prevPass" },
  { label: "New_Pass", name: "newPass" },
  { label: "Repeat_Pass", name: "repeatPass" },
];

const ChangePassword = () => {
  const { t } = useTranslation();
  return (
    <Formik
      initialValues={{
        prevPass: "",
        newPass: "",
        repeatPass: "",
      }}
      validationSchema={ChangePassValidation}
      onSubmit={() => console.log("asdf")}
    >
      {({ handleSubmit }) => {
        return (
          <Box
            className={
              "glassmorphism-card p-8 w-[80%] md:w-[40%] shadow-lg border-1 m-auto space-y-4"
            }
          >
            <Typography
              className={
                "text-primary !font-extrabold text-[20px] flex items-center justify-center gap-x-3"
              }
            >
              <LockResetRounded className={"w-8 h-8"} />
              {t("Change_Pass")}
            </Typography>
            <Form onSubmit={handleSubmit}>
              <Box className={"space-y-4"}>
                {formFields?.map((field, index) => (
                  <FormikInput
                    type={"password"}
                    key={`reset-pass-${index}`}
                    {...field}
                    label={t(field?.label)}
                  />
                ))}
                <Button
                  type="submit"
                  className={"bg-primary text-white w-full"}
                >
                  submit
                </Button>
              </Box>
            </Form>
          </Box>
        );
      }}
    </Formik>
  );
};

export default ChangePassword;
