import { DialogContentText, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { DataGrid, GridActionsCellItem, GridColumns } from "@mui/x-data-grid";
import ConfirmationDialog from "components/ConfirmationDialog";
import Icon from "components/Icon";
import Skeleton from "components/Skeleton";
import TitleNav from "components/TitleNav";
import { GridToolbarColumns } from "components/ToolbarDataGrid";
import { useConfirmationDialog } from "hooks/useConfirmationDialog";
import { useDeleteItem } from "hooks/useDeleteItem";
import { IMiembroActaGrado } from "models/interfaces/IActaGrado";
import { useMemo } from "react";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { deleteMiembroActaGrado } from "services/miembro-acta-grado";
import { parseToDate } from "utils/date";
import { getNombreCompletoMiembro } from "utils/libs";
import AddAsistenteActa from "../components/AddAsistenteActa";
import useActaGrado from "../hooks/useActaGrado";

const AsistenciaActaGrado = () => {
  const client = useQueryClient();
  const { actaGradoId = "" } = useParams<{ actaGradoId: string }>();
  const { actaGrado, isLoadingActaGrado, miembros, isLoadingMiembros } =
    useActaGrado({
      actaGradoId,
      props: {
        withMiembros: true,
      },
    });

  const {
    isVisible: isVisibleAddDocente,
    openJustModal: openModalAddDocente,
    closeModal: closeModalAddDocente,
  } = useConfirmationDialog();

  const {
    isVisible: isVisibleDeleteMiembroModal,
    openModal: openDeleteMiembroModal,
    closeModal: closeDeleteMiembroModal,
    itemSelected: itemMiembroSelected,
  } = useConfirmationDialog<IMiembroActaGrado>();

  const { deleting, handleDelete } = useDeleteItem({
    id: itemMiembroSelected?.id,
    onDelete: deleteMiembroActaGrado,
    callback: () => {
      client.invalidateQueries(["miembros-acta-grados"]);
      closeDeleteMiembroModal();
    },
  });

  const columns = useMemo(
    (): GridColumns => [
      {
        field: "docente",
        headerName: "Docente",
        flex: 1,
        valueGetter: getNombreCompletoMiembro,
      },
      {
        field: "tipo",
        headerName: "Tipo",
        width: 200,
      },
      {
        field: "informacion_adicional",
        headerName: "Doc. asignación",
        flex: 1,
      },
      {
        type: "date",
        field: "fecha_asignacion",
        headerName: "F. asignación",
        width: 150,
        valueFormatter: (v) => parseToDate(v.value),
      },
      {
        type: "actions",
        field: "acciones",
        headerName: "Acciones",
        getActions: (p) => [
          <GridActionsCellItem
            key={p.id}
            color="error"
            // disabled={!consejo?.estado}
            icon={
              <Tooltip title="Eliminar" arrow>
                <Icon icon="delete" />
              </Tooltip>
            }
            label="Eliminar documento"
            onClick={() => openDeleteMiembroModal(p.row)}
          />,
        ],
      },
    ],
    []
  );

  if (!actaGrado || isLoadingActaGrado) return <Skeleton />;

  return (
    <Stack spacing={2}>
      <TitleNav title="Asistentes" />

      <Box>
        <Button
          fullWidth
          disabled={!actaGrado.fecha_presentacion}
          startIcon={<Icon icon="add" />}
          variant="outlined"
          onClick={openModalAddDocente}
        >
          AGREGAR
        </Button>
      </Box>

      <div style={{ height: 700, width: "100%" }}>
        <DataGrid
          // selectionModel={selectionModel}
          // onSelectionModelChange={(newSelectionModel) => {
          //   setSelectionModel(newSelectionModel);
          // }}
          // checkboxSelection
          // disableSelectionOnClick
          disableColumnMenu
          // columnVisibilityModel={columnVisibilityModel}
          // onColumnVisibilityModelChange={onColumnVisibilityModelChange}
          components={{ Toolbar: GridToolbarColumns }}
          columns={columns}
          loading={isLoadingMiembros}
          rows={miembros}
        />
      </div>

      <AddAsistenteActa
        actaGrado={actaGrado}
        isVisible={isVisibleAddDocente}
        onCancel={closeModalAddDocente}
      />

      <ConfirmationDialog
        id="delete-asistente-acta-grado-modal"
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
          <strong>{itemMiembroSelected?.docente.nombres}</strong>?
        </DialogContentText>
      </ConfirmationDialog>
    </Stack>
  );
};

export default AsistenciaActaGrado;
