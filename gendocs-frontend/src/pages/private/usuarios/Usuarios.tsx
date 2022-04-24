import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import { ChipStatus, Icon, TitleNav } from "components";
import { IUser } from "models/interfaces";
import { useCallback, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { getUsers } from "services";

const columns: GridColumns = [
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
    type: "actions",
    field: "acciones",
    headerName: "Acciones",
    getActions: (p) => [
      <GridActionsCellItem
        key={p.id}
        color="primary"
        icon={
          <Tooltip title="Editar" arrow>
            <Icon icon="edit" />
          </Tooltip>
        }
        label="Editar"
        LinkComponent={RouterLink}
        to={`${p.row.id}`}
      />,
    ],
  },
];

const Usuarios = () => {
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
      <TitleNav title="Usuarios" goback={false} />
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

export default Usuarios;
