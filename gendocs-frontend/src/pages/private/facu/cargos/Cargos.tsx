import Button from "@mui/material/Button";
import DialogContentText from "@mui/material/DialogContentText";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid, GridActionsCellItem, GridColumns } from "@mui/x-data-grid";
import ConfirmationDialog from "components/ConfirmationDialog";
import Icon from "components/Icon";
import TitleNav from "components/TitleNav";
import { GridToolbarWithoutExport } from "components/ToolbarDataGrid";
import { useConfirmationDialog } from "hooks/useConfirmationDialog";
import { useDeleteItem } from "hooks/useDeleteItem";
import { useGridColumnVisibilityModel } from "hooks/useGridColumnVisibilityModel";
import { ICargo } from "models/interfaces/ICargo";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { deleteCargo } from "services/cargos";
import { useListCargos } from "./hooks/useListCargos";

const Cargos = () => {
  const [token, setToken] = useState(1);
  const { cargos, isLoading } = useListCargos({ token });

  const { columnVisibilityModel, onColumnVisibilityModelChange } =
    useGridColumnVisibilityModel({
      key: "table-cargos",
    });

  const { isVisible, openModal, closeModal, itemSelected } =
    useConfirmationDialog<ICargo>();

  const { deleting, handleDelete } = useDeleteItem({
    id: itemSelected?.id,
    onDelete: deleteCargo,
    callback: () => {
      setToken(Date.now());
      closeModal();
    },
  });

  const columns: GridColumns = [
    { field: "nombre", headerName: "Nombre", flex: 1 },
    { field: "variable", headerName: "Variable", flex: 1 },
    {
      field: "docente",
      headerName: "Funcionario",
      flex: 2,
      valueGetter: (item) => item?.value?.nombres || "",
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
          to={p.row.id + ""}
        />,
        <GridActionsCellItem
          key={p.id}
          color="error"
          label="Eliminar"
          icon={
            <Tooltip title="Eliminar" arrow>
              <Icon icon="delete" />
            </Tooltip>
          }
          onClick={() => openModal(p.row)}
        />,
      ],
    },
  ];

  return (
    <Stack spacing={2}>
      <TitleNav title="Cargos" goback={false} />
      <Button
        component={RouterLink}
        startIcon={<Icon icon="add" />}
        to="nuevo"
        variant="outlined"
      >
        AÑADIR CARGO
      </Button>

      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          disableColumnMenu
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={onColumnVisibilityModelChange}
          components={{ Toolbar: GridToolbarWithoutExport }}
          columns={columns}
          loading={isLoading}
          rows={cargos}
        />
      </div>

      <ConfirmationDialog
        id="delete-cargo-modal"
        keepMounted={true}
        isVisible={isVisible}
        title="Eliminar"
        onCancel={closeModal}
        onApprove={handleDelete}
        textApprove="ELIMINAR"
        buttonColorApprove="error"
        loading={deleting}
      >
        <DialogContentText>
          ¿Está seguro que desea eliminar el registro{" "}
          <strong>{itemSelected?.nombre}</strong>?
        </DialogContentText>
      </ConfirmationDialog>
    </Stack>
  );
};

export default Cargos;
