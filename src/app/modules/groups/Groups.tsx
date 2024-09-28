import { Button, Typography } from "@mui/material";
import CustomizedAccordions from "../../../_cloner/components/Accordion";
import { useDeleteApplicationRoles, useGetApplicationRoles } from "./_hooks";
import { EnqueueSnackbar } from "../../../_cloner/helpers/snackebar";
import GroupEditForm from "./GroupEditForm";
import ConfirmDialog from "../../../_cloner/components/ConfirmDialog";
import { useState } from "react";
import Backdrop from "../../../_cloner/components/Backdrop";
import TransitionsModal from "../../../_cloner/components/ReusableModal";
import GroupForm from "./GroupForm";
import AccessDenied from "../../routing/AccessDenied";
import { useQueryClient } from "@tanstack/react-query";

const RoleGroups = () => {
    const queryClient = useQueryClient()
    const userInfo: any = queryClient.getQueryData(['userInfo']);

    let userRoles: string[] = []
    userRoles = [].concat(...userInfo.data.userRoles.map((item: {roleName: string}) => item.roleName) || [])

      const [approve, setApprove] = useState<boolean>(false);
    const [deletedId, setDeletedId] = useState<string>("");
    const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);

    const groups = useGetApplicationRoles();
    const deleteGroup = useDeleteApplicationRoles();

    const handleDelete = (id: string) => {
        deleteGroup.mutate(id, {
            onSuccess: (message: any) => {
                if (message.succeeded) {
                    EnqueueSnackbar("گروه با موفقیت حذف گردید.", "info");
                    groups.refetch();
                    setApprove(false);
                } else {
                    EnqueueSnackbar(message?.data?.Message, "warning");
                    setApprove(false);
                }
            },
        });
    };

    const handleOpenApprove = (id: string) => {
        setApprove(true);
        setDeletedId(id);
    };

    if (!userRoles.includes("Admin")) {
        return <AccessDenied />;
    }

    if (groups.isLoading) {
        return <Backdrop loading={groups.isLoading} />;
    }

    return (
        <>
            {deleteGroup.isLoading && (
                <Backdrop loading={deleteGroup.isLoading} />
            )}
            <div className="grid grid-cols-1 gap-4">
                <div>
                    <div className="flex justify-end mb-4">
                        <Button
                            onClick={() => setIsCreateOpen(true)}
                            color="secondary"
                            variant="contained"
                        >
                            <Typography>ایجاد گروه جدید</Typography>
                        </Button>
                    </div>
                    {groups?.data?.data.map(
                        (item: { id: string; name: string, description: string, rolePermissions: any }) => {
                            return (
                                <CustomizedAccordions
                                    deleteOnClick={() =>
                                        handleOpenApprove(item.id)
                                    }
                                    title={`${item.name} (${item.description})`}
                                    content={<GroupEditForm itemData={item} />}
                                />
                            );
                        }
                    )}
                </div>
                {/* <div>
                    <ReusableCard>
                        <div>
                            <div className="hidden md:flex md:justify-center md:items-center">
                                <div className="flex flex-col flex-wrap gap-4">
                                    <Typography
                                        variant="h1"
                                        className="text-yellow-500"
                                    >
                                        راهنما
                                    </Typography>
                                    <Typography variant="body1" className="">
                                        در این راهنما، نحوه ایجاد و مدیریت
                                        دسترسی‌ها در سامانه توضیح داده می‌شود.
                                        هدف از این راهنما، فراهم کردن روشی ساده
                                        و کارآمد برای مدیریت دسترسی‌های کاربران
                                        به مجوزها و منوهای مختلف سامانه است.
                                        لطفاً مراحل زیر را به دقت دنبال کنید:
                                    </Typography>
                                    <div className="flex flex-col flex-wrap gap-2">
                                        <Typography
                                            variant="h2"
                                            className="text-red-500"
                                        >
                                            1. دسترسی به مجوزها و منوها
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            className=""
                                        >
                                            ابتدا باید بدانید که دو نوع دسترسی
                                            وجود دارد که باید برای گروه ها تنظیم
                                            شود:
                                        </Typography>
                                        <Typography variant="h3" className="">
                                            دسترسی به مجوزها
                                        </Typography>
                                        <Typography variant="h3" className="">
                                            دسترسی به منوها
                                        </Typography>
                                    </div>
                                    <div className="flex flex-col flex-wrap gap-2">
                                        <Typography
                                            variant="h2"
                                            className="text-red-500"
                                        >
                                            2. فعال‌سازی دسترسی به منوها
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            className=""
                                        >
                                            در اولین مرحله، باید دسترسی به منوها
                                            را برای گروه مورد نظر فعال کنید.
                                            برای این منظور، مراحل زیر را انجام
                                            دهید:
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            className=""
                                        >
                                            از قسمت دسترسی به منو ها، منوی مورد
                                            نظر را فعال می نمائید این منوها ممکن
                                            است شامل منوهای اصلی سامانه و همچنین
                                            منوهای خاص بخش‌های مختلف باشد.
                                        </Typography>
                                    </div>
                                    <div className="flex flex-col flex-wrap gap-2">
                                        <Typography
                                            variant="h2"
                                            className="text-red-500"
                                        >
                                            3. دسترسی به مجوزها
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            className=""
                                        >
                                            در اولین مرحله، باید دسترسی به
                                            مجوزها را برای گروه مورد نظر فعال
                                            کنید. برای این منظور، مراحل زیر را
                                            انجام دهید:
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            className=""
                                        >
                                            از قسمت دسترسی به مجوزها، منوی
                                            موردنظر را انتخاب کنید سپس لیستی از
                                            مجوزهای منو را انتخاب و اقدام به ثبت
                                            نمائید
                                        </Typography>
                                    </div>
                                    <div className="flex flex-col flex-wrap gap-2">
                                        <Typography
                                            variant="h2"
                                            className="text-red-500"
                                        >
                                            نکات مهم
                                        </Typography>
                                        <Typography
                                            variant="h4"
                                            className=""
                                        >
                                            برای اینکه منوها به کاربر نمایش داده شود باید از قسمت دسترسی به مجوز ها ---- کاربران -----منوهای کاربر، دریافت جزئیات کاربر و دریافت جزئیات کاربر براساس کد یونیک را ثبت نمائید
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ReusableCard>
                </div> */}
            </div>

            <TransitionsModal
                open={isCreateOpen}
                isClose={() => setIsCreateOpen(false)}
                title="ایجاد گروه جدید"
                width="50%"
                description="برای ایجاد 'گروه' جدید، لطفاً نام گروه و توضیحات خود را با دقت وارد کنید  اگر سوالی دارید یا نیاز به راهنمایی دارید، تیم پشتیبانی ما همیشه در دسترس شماست."
            >
                <GroupForm
                    refetch={groups.refetch}
                    setIsCreateOpen={setIsCreateOpen}
                />
            </TransitionsModal>

            <ConfirmDialog
                open={approve}
                hintTitle="آیا از حذف مطمئن هستید؟"
                notConfirmText="لغو"
                confirmText={
                    deleteGroup.isLoading ? "درحال پردازش ..." : "تایید"
                }
                onCancel={() => setApprove(false)}
                onConfirm={() => handleDelete(deletedId)}
            />
        </>
    );
};

export default RoleGroups;
