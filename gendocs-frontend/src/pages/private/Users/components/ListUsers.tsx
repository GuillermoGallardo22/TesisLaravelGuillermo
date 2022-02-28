import { Stack, Button, IconButton, Chip } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { Link as RouterLink } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { IUser } from "models/interfaces";
import { getUsers } from "services/auth";
import ChipStatus from "components/ChipStatus";

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
                <EditIcon />
            </IconButton>
        ),
    },
];

const ListUsers = () => {
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
        <Stack spacing={3}>
            <Button component={RouterLink} startIcon={<AddIcon />} to="nuevo">
                AÑADIR USUARIO
            </Button>

            <div style={{ height: 600, width: "100%" }}>
                <DataGrid loading={loading} columns={columns} rows={users} />
            </div>
        </Stack>
    );
};

export default ListUsers;
