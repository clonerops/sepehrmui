import { Box, Button, Card, Container, Modal, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {
    useDeleteRoleMenu,
    useGetApplicationMenus,
    useGetRoleMenus,
    useGetRoles,
    usePostRoleMenus,
} from "./core/_hooks";
import { appMenuConvert, roleConvert } from "./helpers/roleConvert";
import { IRoleMenu } from "./core/_models";
import { postRoleMenusValidation } from "./validation/validation";
import Menus from "./Menus";
import FuzzySearch from "../../../_cloner/helpers/Fuse";
import MuiDataGrid from "../../../_cloner/components/MuiDataGrid";
import { toAbsoulteUrl } from "../../../_cloner/helpers/AssetsHelper";

interface Item {
    uniqueRole: string;
    roleName: string;
}

const initialValues: IRoleMenu = {
    roleId: "",
    applicationMenuId: [],
};

const RoleMenu = () => {
    // Fetching
    const roleTools = useGetRoles();
    // State
    const [results, setResults] = useState<Item[]>([]);
    const [visible, setVisible] = useState<boolean>(false);

    const [items, setItems] = useState<any>({});

    useEffect(() => {
        setResults(roleTools?.data);
    }, [roleTools?.data]);

    const columns = (renderActions: any) => {
        const col = [
            { field: "name", headerName: "نام نقش کاربری", flex: 1 },
            {
                field: "Action",
                headerName: "عملیات",
                renderCell: renderActions,
                flex: 1,
            },
        ];
        return col;
    };

    const renderActions = (item: IRoleMenu) => {
        return (
            <Box component="div" className="tw-flex tw-gap-4">
                <Box
                    component="div"
                    className="tw-bg-yellow-500 tw-px-4 tw-py-2 tw-cursor-pointer tw-rounded-md"
                >
                    <Box
                        component="div"
                        className="flex items-center gap-x-3  tw-text-white"
                    >
                        <Button
                            onClick={() => {
                                setVisible(true);
                                setItems(item);
                            }}
                            className="bg-yellow-500"
                        >
                            <Typography variant="h4" className="text-black">
                                {"اعمال نقش-منو"}
                            </Typography>
                        </Button>
                    </Box>
                </Box>
            </Box>
        );
    };

    return (
        <>
            <Box component="div" className="grid grid-cols-2">
                <Card className="glassmorphism-card p-4">
                    <Container>
                        <FuzzySearch
                            keys={["applicationMenuId", "roleId"]}
                            data={roleTools?.data || []}
                            setResults={setResults}
                            threshold={0.4}
                        />
                        <Box component="div" className="my-4">
                            <MuiDataGrid
                                columns={columns(renderActions)}
                                rows={results}
                                data={roleTools?.data}
                            />
                        </Box>
                    </Container>
                </Card>
                <Box component="div" className="flex justify-center items-center">
                    <img
                        src={toAbsoulteUrl(
                            "/media/logos/business-person-analyzing-data-3317127-2761620.png"
                        )}
                    />
                </Box>
            </Box>
            <Modal
                open={visible}
                onClose={() => setVisible(false)}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Menus items={items} />
            </Modal>
        </>
    );
};

export default RoleMenu;
