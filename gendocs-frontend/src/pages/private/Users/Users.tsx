import { Button, IconButton, Stack } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { ChipStatus, Icon } from "components";
import { IUser } from "models/interfaces";
import { useCallback, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { getUsers } from "services/auth";

const columns: GridColDef[] = [
    { field: "name", headerName: "Nombre", flex: 1 },
    { field: "email", headerName: "Correo (UTA)", flex: 1 },
    { field: "email_gmail", headerName: "Correo (GMAIL)", flex: 1 },
    {
        field: "status",
        headerName: "Estado",
        width: 120,
        renderCell: (item: GridRenderCellParams) => (
            <ChipStatus value={item?.value} />
        ),
    },
    {
        field: "id",
        headerName: "Acciones",
        renderCell: (item: GridRenderCellParams) => (
            <IconButton
                color="primary"
                component={RouterLink}
                to={item.value + ""}
            >
                <Icon icon="edit" />
            </IconButton>
        ),
    },
];

const Users = () => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState<IUser[]>([]);

    const loadInitData = useCallback(() => {
        setLoading(true);
        getUsers()
            .then((r) => setUsers(r))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        loadInitData();
    }, []);

    return (
        <Stack spacing={2}>
            <Button
                component={RouterLink}
                startIcon={<Icon icon="add" />}
                to="nuevo"
                variant="outlined"
            >
                AÑADIR USUARIO
            </Button>

            <div style={{ height: 600, width: "100%" }}>
                <DataGrid loading={loading} columns={columns} rows={users} />
            </div>
        </Stack>
    );
};

export default Users;
