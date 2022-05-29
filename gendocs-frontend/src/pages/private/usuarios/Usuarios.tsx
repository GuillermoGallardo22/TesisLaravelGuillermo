import Button from "@mui/material/Button";
import DialogContentText from "@mui/material/DialogContentText";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRenderCellParams,
  GridRowParams,
} from "@mui/x-data-grid";
import { ChipStatus, ConfirmationDialog, Icon, TitleNav } from "components";
import { useConfirmationDialog } from "hooks";
import { HTTP_STATUS } from "models/enums";
import { IUser } from "models/interfaces";
import { useSnackbar } from "notistack";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { getUsers, resetUserPassword } from "services";

const Usuarios = () => {
  const { enqueueSnackbar } = useSnackbar();

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

  const [reseting, setReseting] = useState(false);

  const {
    isVisible: isVisible,
    openModal: openModal,
    closeModal: closeModal,
    itemSelected: itemSelected,
  } = useConfirmationDialog<IUser>();

  const _resetPassword = async () => {
    if (!itemSelected) return;

    setReseting(true);

    const result = await resetUserPassword(itemSelected.email);

    if (result.status === HTTP_STATUS.ok) {
      enqueueSnackbar(result.message, { variant: "success" });
    } else {
      const { errors, message } = result;

      enqueueSnackbar(errors?.length ? errors[0] : message, {
        variant: "error",
      });
    }

    closeModal();
    setReseting(false);
  };

  const columns = useMemo(
    (): GridColumns => [
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
        getActions: (p: GridRowParams<IUser>) => [
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
          <GridActionsCellItem
            key={p.id}
            color="error"
            label="Restablecer contraseña"
            icon={
              <Tooltip title="Restablecer contraseña" arrow>
                <Icon icon="lockReset" />
              </Tooltip>
            }
            onClick={() => openModal(p.row)}
          />,
        ],
      },
    ],
    []
  );

  return (
    <>
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

      <ConfirmationDialog
        id="reset-password-modal"
        keepMounted={true}
        isVisible={isVisible}
        title="Restablecer contraseña"
        onCancel={closeModal}
        onApprove={_resetPassword}
        textApprove="ACEPTAR"
        buttonColorApprove="error"
        loading={reseting}
      >
        <DialogContentText>
          ¿Está seguro que desea restablecer la contraseña al usuario{" "}
          <strong>{itemSelected?.name}</strong>?
        </DialogContentText>
      </ConfirmationDialog>
    </>
  );
};

export default Usuarios;
