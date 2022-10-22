import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { DataGrid, GridColumns } from "@mui/x-data-grid";
import {
  BooleanCell,
  GridToolbarColumns,
  Icon,
  Skeleton,
  TitleNav,
} from "components";
import { useConfirmationDialog } from "hooks";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { getNombreCompletoMiembro } from "utils";
import AddAsistenteActa from "../components/AddAsistenteActa";
import useActaGrado from "../hooks/useActaGrado";

const AsistenciaActaGrado = () => {
  const { actaGradoId = "" } = useParams<{ actaGradoId: string }>();
  const { actaGrado, isLoadingActaGrado, miembros, isLoadingMiembros } =
    useActaGrado(actaGradoId);

  const {
    isVisible: isVisibleAddDocente,
    openJustModal: openModalAddDocente,
    closeModal: closeModalAddDocente,
  } = useConfirmationDialog();

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
        flex: 1,
      },
      {
        field: "informacion_adicional",
        headerName: "Inf. adicional",
        width: 250,
      },
      // {
      //   type: "boolean",
      //   field: "notificado",
      //   headerName: "Notificado",
      //   flex: 1,
      //   renderCell: (r) => <BooleanCell value={r.row.notificado} />,
      // },
      {
        type: "boolean",
        field: "asistio",
        headerName: "Asistió",
        flex: 1,
        renderCell: (r) => <BooleanCell value={r.row.asistio} />,
      },
      // {
      //   type: "boolean",
      //   field: "responsable",
      //   headerName: "Responsable",
      //   flex: 1,
      //   renderCell: (r) => <BooleanCell value={r.row.responsable} />,
      // },
      {
        type: "actions",
        field: "acciones",
        headerName: "Acciones",
        getActions: (p) => [
          // <GridActionsCellItem
          //   key={p.id}
          //   color="error"
          //   disabled={!consejo?.estado}
          //   icon={
          //     <Tooltip title="Eliminar" arrow>
          //       <Icon icon="delete" />
          //     </Tooltip>
          //   }
          //   label="Eliminar documento"
          //   onClick={() => openDeleteMiembroModal(p.row as IMiembro)}
          // />,
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
    </Stack>
  );
};

export default AsistenciaActaGrado;
