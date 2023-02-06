import { DialogContentText, Grid, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridSelectionModel,
} from "@mui/x-data-grid";
import BooleanCell from "components/BooleanCell";
import ConfirmationDialog from "components/ConfirmationDialog";
import Icon from "components/Icon";
import Skeleton from "components/Skeleton";
import TitleNav from "components/TitleNav";
import { GridToolbarColumns } from "components/ToolbarDataGrid";
import { useConfirmationDialog } from "hooks/useConfirmationDialog";
import { useDeleteItem } from "hooks/useDeleteItem";
import { useGridColumnVisibilityModel } from "hooks/useGridColumnVisibilityModel";
import { IActaGrado, IMiembroActaGrado } from "models/interfaces/IActaGrado";
import { useMemo, useState } from "react";
import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import {
  deleteMiembroActaGrado,
  marcarAsistencia,
} from "services/miembro-acta-grado";
import { parseToDateString } from "utils/date";
import { getNombreCompletoMiembro } from "utils/libs";
import { AsistenciaDialog } from "../../consejos/components/AsistenciaDialog";
import AddAsistenteActa from "../components/AddAsistenteActa";
import useActaGrado from "../hooks/useActaGrado";
import useMiembrosActaGrado from "../hooks/useMiembrosActaGrado";

const LoadingAsistenciaActaGrado = () => {
  const { actaGradoId = "" } = useParams<{ actaGradoId: string }>();
  const { actaGrado, isLoadingActaGrado } = useActaGrado({
    actaGradoId,
    props: {
      withMiembros: true,
    },
  });

  return !actaGrado || isLoadingActaGrado ? (
    <Skeleton />
  ) : (
    <AsistenciaActaGradoBase actaGrado={actaGrado} />
  );
};

type AsistenciaActaGradoBaseProps = {
  actaGrado: IActaGrado;
};

const AsistenciaActaGradoBase: React.FunctionComponent<
  AsistenciaActaGradoBaseProps
> = ({ actaGrado }) => {
  const client = useQueryClient();

  const { isLoadingMiembros, miembros } = useMiembrosActaGrado({
    actaGradoId: actaGrado.id.toString(),
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
        valueFormatter: (v) => parseToDateString(v.value),
      },
      {
        type: "boolean",
        field: "asistio",
        headerName: "Asistió",
        renderCell: (r) => <BooleanCell value={r.row.asistio} />,
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

  const {
    isVisible: isVisibleA,
    openJustModal: openModalA,
    closeModal: closeModalA,
  } = useConfirmationDialog();

  const { columnVisibilityModel, onColumnVisibilityModelChange } =
    useGridColumnVisibilityModel({
      key: "asistentesActaGradoTableModel",
    });

  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);

  const miembrosSeleccionados = useMemo(
    (): IMiembroActaGrado[] =>
      miembros.filter((m) => selectionModel.some((s) => s === m.id)),
    [selectionModel.length]
  );

  return (
    <Stack spacing={2}>
      <TitleNav title="Asistentes" />

      <Box>
        <Grid container spacing={2} columns={{ xs: 2 }}>
          <Grid item xs={1} sm={2} md={1}>
            <Button
              fullWidth
              // disabled={!actaGrado.fecha_presentacion}
              startIcon={<Icon icon="add" />}
              variant="outlined"
              onClick={openModalAddDocente}
            >
              AGREGAR
            </Button>
          </Grid>
          <Grid item xs={1}>
            <Button
              fullWidth
              disabled={!selectionModel.length}
              startIcon={<Icon icon="factCheck" />}
              variant="outlined"
              onClick={openModalA}
            >
              Marcar asistencia
            </Button>
          </Grid>
        </Grid>
      </Box>

      <div style={{ height: 700, width: "100%" }}>
        <DataGrid
          selectionModel={selectionModel}
          onSelectionModelChange={setSelectionModel}
          checkboxSelection
          disableSelectionOnClick
          disableColumnMenu
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={onColumnVisibilityModelChange}
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

      <AsistenciaDialog
        isVisible={isVisibleA}
        closeModal={closeModalA}
        miembros={miembrosSeleccionados}
        queryKey={["miembros-acta-grados"]}
        nameKey={"docente"}
        onSummit={marcarAsistencia}
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

const AsistenciaActaGrado = LoadingAsistenciaActaGrado;

export default AsistenciaActaGrado;
