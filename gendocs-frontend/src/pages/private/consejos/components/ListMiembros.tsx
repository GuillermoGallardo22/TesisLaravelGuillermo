import { Box, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import DialogContentText from "@mui/material/DialogContentText";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridSelectionModel,
} from "@mui/x-data-grid";
import {
  ConfirmationDialog,
  GridToolbarColumns,
  Icon,
  TitleNav,
} from "components";
import {
  useConfirmationDialog,
  useDeleteItem,
  useGridColumnVisibilityModel,
} from "hooks";
import { IMiembro } from "models/interfaces";
import { useMemo, useState } from "react";
import { useQueryClient } from "react-query";
import { deleteMiembro } from "services";
import { getNombreCompletoMiembro } from "utils";
import { useMiembros } from "../hooks/useMiembros";
import { AddMiembro } from "./AddMiembro";
import { NotificacionEmail } from "./NotificationEmail";

export default function ListMiembros() {
  const { miembros, isLoading, consejo } = useMiembros();
  const client = useQueryClient();

  const {
    isVisible: isVisibleDeleteMiembroModal,
    openModal: openDeleteMiembroModal,
    closeModal: closeDeleteMiembroModal,
    itemSelected: itemMiembroSelected,
  } = useConfirmationDialog<IMiembro>();

  const { deleting, handleDelete } = useDeleteItem({
    id: itemMiembroSelected?.id,
    onDelete: deleteMiembro,
    callback: () => {
      client.invalidateQueries(["consejos-miembros"]);
      closeDeleteMiembroModal();
    },
  });

  const columns = useMemo(
    (): GridColumns => [
      {
        field: "miembro",
        headerName: "Nombres",
        flex: 1,
        valueGetter: getNombreCompletoMiembro,
      },
      {
        type: "boolean",
        field: "notificado",
        headerName: "Notificado",
        flex: 1,
      },
      {
        type: "boolean",
        field: "asistio",
        headerName: "Asistió",
        flex: 1,
      },
      {
        type: "boolean",
        field: "responsable",
        headerName: "Responsable",
        flex: 1,
      },
      {
        type: "actions",
        field: "acciones",
        headerName: "Acciones",
        getActions: (p) => [
          <GridActionsCellItem
            key={p.id}
            color="error"
            disabled={!consejo?.estado}
            icon={
              <Tooltip title="Eliminar" arrow>
                <Icon icon="delete" />
              </Tooltip>
            }
            label="Eliminar documento"
            onClick={() => openDeleteMiembroModal(p.row as IMiembro)}
          />,
        ],
      },
    ],
    [consejo]
  );

  const {
    isVisible: isVisibleAddMiembroModal,
    openJustModal: openAddMiembroModal,
    closeModal: closeAddMiembroModal,
  } = useConfirmationDialog();

  const { columnVisibilityModel, onColumnVisibilityModelChange } =
    useGridColumnVisibilityModel({
      key: "asistentesTableModel",
    });

  const {
    isVisible: isVisibleNE,
    openJustModal: openModalNE,
    closeModal: closeModalNE,
  } = useConfirmationDialog();

  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

  const miembrosSeleccionados = useMemo(
    (): IMiembro[] =>
      miembros.filter((m) => selectionModel.some((s) => s === m.id)),
    [selectionModel]
  );

  return (
    <Stack spacing={2}>
      <TitleNav title="Miembros" />

      <Box>
        <Grid container spacing={2} columns={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={1} sm={2} md={1}>
            <Button
              fullWidth
              disabled={!consejo || !consejo?.estado}
              startIcon={<Icon icon="add" />}
              variant="outlined"
              onClick={openAddMiembroModal}
            >
              AGREGAR MIEMBRO
            </Button>
          </Grid>
          <Grid item xs={1}>
            <Button
              fullWidth
              disabled={!selectionModel.length}
              startIcon={<Icon icon="email" />}
              variant="outlined"
              onClick={() => openModalNE()}
            >
              Notificar
            </Button>
          </Grid>
          <Grid item xs={1}>
            <Button
              fullWidth
              disabled={!selectionModel.length}
              startIcon={<Icon icon="factCheck" />}
              variant="outlined"
              // onClick={openAddMiembroModal}
            >
              Marcar asistencia
            </Button>
          </Grid>
        </Grid>
      </Box>

      <div style={{ height: 700, width: "100%" }}>
        <DataGrid
          selectionModel={selectionModel}
          onSelectionModelChange={(newSelectionModel) => {
            setSelectionModel(newSelectionModel);
          }}
          checkboxSelection
          disableSelectionOnClick
          disableColumnMenu
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={onColumnVisibilityModelChange}
          components={{ Toolbar: GridToolbarColumns }}
          columns={columns}
          loading={isLoading}
          rows={miembros}
        />
      </div>

      {consejo && (
        <NotificacionEmail
          isVisible={isVisibleNE}
          closeModal={closeModalNE}
          miembros={miembrosSeleccionados}
          consejo={consejo}
        />
      )}

      {consejo && isVisibleAddMiembroModal && (
        <AddMiembro
          consejo={consejo}
          isVisible={isVisibleAddMiembroModal}
          onCancel={closeAddMiembroModal}
        />
      )}

      {itemMiembroSelected && isVisibleDeleteMiembroModal && (
        <ConfirmationDialog
          id="delete-miembro-modal"
          title="Eliminar"
          keepMounted={true}
          isVisible={isVisibleDeleteMiembroModal}
          onCancel={closeDeleteMiembroModal}
          onApprove={handleDelete}
          textApprove="ELIMINAR"
          buttonColorApprove="error"
          loading={deleting}
        >
          <DialogContentText>
            ¿Está seguro que desea eliminar el registro{" "}
            <strong>{itemMiembroSelected.docente.nombres}</strong>?
          </DialogContentText>
        </ConfirmationDialog>
      )}
    </Stack>
  );
}
