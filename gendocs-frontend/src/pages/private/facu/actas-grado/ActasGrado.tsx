import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DialogContentText from "@mui/material/DialogContentText";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRowParams,
  GridValueFormatterParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import BooleanCell from "components/BooleanCell";
import ConfirmationDialog from "components/ConfirmationDialog";
import Icon from "components/Icon";
import Select from "components/Select";
import TitleNav from "components/TitleNav";
import { GridToolbarWithoutExport } from "components/ToolbarDataGrid";
import { useConfirmationDialog } from "hooks/useConfirmationDialog";
import { useDeleteItem } from "hooks/useDeleteItem";
import { useGridColumnVisibilityModel } from "hooks/useGridColumnVisibilityModel";
import { GoogleType } from "models/enums/GoogleType";
import { LocalStorageKeys } from "models/enums/LocalStorageKeys";
import {
  IActaGrado,
  IEstadoActa,
  ITipoActaGrado,
} from "models/interfaces/IActaGrado";
import { IAula } from "models/interfaces/IAula";
import { ICanton } from "models/interfaces/ICanton";
import { IEstudiante } from "models/interfaces/IEstudiante";
import { IModalidadActaGrado } from "models/interfaces/IModalidadActaGrado";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { deleteActaGrado, getActasGrado, cerrarActaGrado } from "services/actas-grado";
import { parseToDate, parseToDateTime } from "utils/date";
import { getLocalStoragePreviousValue } from "utils/libs";
import { useListCarreras } from "../carreras/hooks/useListCarreras";
import { useEstadoActasList } from "./hooks/useEstadoActasList";
import { useGenerarNumeracion } from "./hooks/useGenerarNumeracion";
import { useModalidadActasList } from "./hooks/useModalidadActasList";
import { useTipoActasList } from "./hooks/useTipoActasList";

const ActasGrado: React.FunctionComponent = () => {
  const [token, setToken] = useState(1);

  const [carrera, setCarrera] = useState(
    getLocalStoragePreviousValue(
      LocalStorageKeys.CARRERA_SELECCIONADA_ACTA_GRADO
    )
  );

  const { carreras, isLoading: loadingCarreras } = useListCarreras({
    useQueryOptions: {
      refetchOnWindowFocus: false,
    },
  });
  const { estadoActas, isLoading: loadingEstadoActas } = useEstadoActasList({
    useQueryOptions: {
      refetchOnWindowFocus: false,
    },
  });
  const { modalidades, isLoading: loadingModalidades } = useModalidadActasList({
    useQueryOptions: {
      refetchOnWindowFocus: false,
    },
  });
  const { tiposActas, isLoading: loadingTipoActas } = useTipoActasList({
    useQueryOptions: {
      refetchOnWindowFocus: false,
    },
  });
  
  const {
    isVisible: isVisibleC,
    openModal: openModalC,
    closeModal: closeModalC,
    itemSelected: itemSelectedC,
  } = useConfirmationDialog<IActaGrado>();

  const { deleting: closing, handleDelete: _cerrarActa } = useDeleteItem({
    id: itemSelectedC?.id,
    onDelete: cerrarActaGrado,
    callback: () => {
      // setToken(Date.now());
      refetch();
      closeModalC();
    },
  });


  const {
    data: actasGrado = [],
    isLoading: loadingActasGrado,
    refetch,
  } = useQuery(
    ["actas-grado", carrera],
    () =>
      getActasGrado({
        filters: {
          carrera,
        },
        include: "aula,estudiante,estado,tipo,modalidad,canton,provincia",
      }).then((r) => r.data),
    {
      enabled: carrera !== -1,
    }
  );

  const {
    closeModal: closeDeleteModal,
    isVisible: isVisibleDeleteModal,
    itemSelected: itemSelectedDeleteModal,
    openModal: openDeleteModal,
  } = useConfirmationDialog<IActaGrado>();

  const {
    closeModal: closeGNModal,
    isVisible: isVisibleGNModal,
    // itemSelected: itemSelectedDeleteModal,
    openJustModal: openGNModal,
  } = useConfirmationDialog();

  const { handleGenerarNumeracion, generating } = useGenerarNumeracion({
    carreraId: carrera,
    callback: () => {
      refetch();
      closeGNModal();
    },
  });

  const { deleting, handleDelete } = useDeleteItem({
    id: itemSelectedDeleteModal?.id,
    onDelete: deleteActaGrado,
    callback: () => {
      closeDeleteModal();
      refetch();
    },
  });

  const columns = useMemo(
    (): GridColumns => [
      {
        type: "number",
        field: "numero",
        headerName: "Número",
      },
      {
        type: "number",
        field: "numero_aux",
        headerName: "Número Acta",
      },
      {
        field: "estudiante",
        headerName: "Estudiante",
        // flex: 1,
        width: 270,
        valueGetter: (e: GridValueGetterParams<IEstudiante>) =>
          e.value!.nombres + " " + e.value!.apellidos,
      },
      {
        field: "tema",
        headerName: "Tema",
        flex: 1,
      },
      {
        field: "titulo_bachiller",
        headerName: "Título bachiller",
        flex: 1,
      },
      {
        type: "date",
        field: "fecha_inicio_estudios",
        headerName: "F.I. estudios",
        valueFormatter: (v: GridValueFormatterParams) => parseToDate(v.value),
      },
      {
        type: "date",
        field: "fecha_fin_estudios",
        headerName: "F.F.estudios",
        valueFormatter: (v: GridValueFormatterParams) => parseToDate(v.value),
      },
      {
        type: "dateTime",
        field: "fecha_presentacion",
        headerName: "F. sus./inc.",
        width: 165,
        valueFormatter: (v: GridValueFormatterParams) =>
          v.value && parseToDateTime(v.value),
      },
      {
        type: "number",
        field: "creditos_aprobados",
        headerName: "Créd. apr.",
      },
      {
        type: "number",
        field: "horas_practicas",
        headerName: "Horas prác.",
      },
      {
        field: "canton",
        headerName: "Cantón",
        flex: 1,
        valueGetter: (e: GridValueGetterParams<ICanton>) =>
          e.value!.nombre + " - " + e.value!.provincia.nombre,
      },
      {
        type: "singleSelect",
        field: "tipo_acta",
        headerName: "Mod. Titulación",
        flex: 1,
        valueGetter: (e: GridValueGetterParams<ITipoActaGrado>) =>
          e.value!.codigo + " | " + e.value!.nombre,
        valueOptions: tiposActas.map((v) => v.codigo + " | " + v.nombre),
      },
      {
        type: "singleSelect",
        field: "estado_acta",
        headerName: "Estado acta",
        width: 100,
        valueGetter: (e: GridValueGetterParams<IEstadoActa>) =>
          e.value ? e.value.nombre_mas : "[VACÍO]",
        valueFormatter: (e) => (e.value !== "[VACÍO]" ? e.value : ""),
        valueOptions: [
          ...estadoActas.map((v) => ({
            label: v.nombre_mas,
            value: v.nombre_mas,
          })),
          ...[
            {
              label: "[VACÍO]",
              value: "[VACÍO]",
            },
          ],
        ],
      },
      {
        type: "singleSelect",
        field: "modalidad_acta_grado",
        headerName: "Tipo acta",
        valueGetter: (e: GridValueGetterParams<IModalidadActaGrado>) =>
          e.value!.nombre,
        valueOptions: modalidades.map((v) => v.nombre),
      },
      {
        field: "link",
        headerName: "Link",
        flex: 1,
        renderCell: (r) => (
          <a
            id={r.value}
            href={r.value}
            target="_blank"
            rel="noopener noreferrer"
          >
            {r.value}
          </a>
        ),
      },
      {
        field: "aula",
        headerName: "Aula",
        // flex: 1,
        width: 100,
        valueGetter: (e: GridValueGetterParams<IAula>) => e.value?.nombre,
      },
      {
        type: "number",
        field: "duracion",
        headerName: "Duración",
      },
      {
        type: "boolean",
        field: "solicitar_especie",
        headerName: "Sol. especie",
        width: 110,
        renderCell: (r) => <BooleanCell value={r.value} />,
      },
      {
        type: "boolean",
        field: "envio_financiero_especie",
        headerName: "Envío espcie.",
        width: 110,
        renderCell: (r) => <BooleanCell value={r.value} />,
      },
      {
        type: "actions",
        field: "acciones",
        headerName: "Acciones",
        width: 215,
        getActions: (p: GridRowParams<IActaGrado>) => [
          <GridActionsCellItem
            key={p.id}
            disabled={!p.row.estadoTemp}
            // color="primary"
            LinkComponent={Link}
            to={p.row.id + ""}
            icon={
              <Tooltip title="Editar" arrow>
                <Icon icon="edit" />
              </Tooltip>
            }
            label="Editar"
          />,
          <GridActionsCellItem
            key={p.id}
            disabled={!p.row.estadoTemp}
            color="success"
            LinkComponent={Link}
            to={"asistencia/" + p.row.id}
            icon={
              <Tooltip title="Asistentes" arrow>
                <Icon icon="people" />
              </Tooltip>
            }
            label="Asistentes"
          />,
          <GridActionsCellItem
            key={p.id}
            disabled={!p.row.estadoTemp || !p.row.documento_notas}
            color="secondary"
            LinkComponent={Link}
            // disabled={}
            to={`drive/${p.row.documento_notas}?type=${GoogleType.SPREADSHEETS}`}
            icon={
              <Tooltip title="Notas" arrow>
                <Icon icon="functions" />
              </Tooltip>
            }
            label="Notas"
          />,
          <GridActionsCellItem
            key={p.id}
            color="primary"
            LinkComponent={Link}
            to={`documento/${p.row.id}`}
            icon={
              <Tooltip title="Documento" arrow>
                <Icon icon="article" />
              </Tooltip>
            }
            label="Documento"
          />,
          <GridActionsCellItem
          key={p.id}
          disabled={!p.row.estadoTemp}
          color="warning"
          label="Cerrar"
          icon={
            <Tooltip title="Cerrar" arrow>
              <Icon icon="lock" />
            </Tooltip>
          }
          onClick={() => openModalC(p.row as IActaGrado)}
        />,
          <GridActionsCellItem
            key={p.id}
          disabled={!p.row.estadoTemp}
            color="error"
            icon={
              <Tooltip title="Eliminar" arrow>
                <Icon icon="delete" />
              </Tooltip>
            }
            label="Eliminar acta"
            onClick={() => openDeleteModal(p.row)}
          />,
        ],
      },
    ],
    [estadoActas.length, modalidades.length, tiposActas.length]
  );

  const { columnVisibilityModel, onColumnVisibilityModelChange } =
    useGridColumnVisibilityModel({
      key: "actasGradoTableModel",
    });

  useEffect(() => {
    localStorage.setItem(
      LocalStorageKeys.CARRERA_SELECCIONADA_ACTA_GRADO,
      carrera.toString()
    );
  }, [carrera]);

  const loading =
    loadingCarreras ||
    loadingActasGrado ||
    loadingEstadoActas ||
    loadingModalidades ||
    loadingTipoActas;

  return (
    <Stack spacing={2}>
      <TitleNav title="Actas de grado" goback={false} />

      <Box>
        <Grid container columns={{ xs: 1, sm: 2, lg: 3 }} spacing={2}>
          <Grid item xs={1}>
            <Button
              fullWidth
              component={Link}
              startIcon={<Icon icon="add" />}
              to="nuevo"
              variant="outlined"
            >
              AÑADIR
            </Button>
          </Grid>

          <Grid item xs={1}>
            <Button
              fullWidth
              component={Link}
              startIcon={<Icon icon="article" />}
              to="plantillas"
              variant="outlined"
            >
              PLANTILLAS
            </Button>
          </Grid>
          <Grid item xs={1}>
            <Button
              fullWidth
              startIcon={<Icon icon="autorenew" />}
              variant="outlined"
              onClick={() => openGNModal()}
            >
              Generar numeración
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box>
        <Grid container columns={{ xs: 1, sm: 2, lg: 2 }} spacing={2}>
          
        <Grid item xs={1}>
            <Button
              fullWidth
              component={Link}
              startIcon={<Icon icon="assessment" />}
              to="reporteinicial"
              variant="outlined"
            >
              REPORTE INICIAL
            </Button>
          </Grid>

          <Grid item xs={1}>
            <Button
              fullWidth
              component={Link}
              startIcon={<Icon icon="assessment" />}
              to="reportefinal"
              variant="outlined"
            >
              REPORTE FINAL
            </Button>
          </Grid>
          
        </Grid>
      </Box>

      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Select
              id="carreras"
              name="carreras"
              label="Carreras"
              items={carreras.map((c) => ({
                id: c.id,
                label: c.nombre,
              }))}
              value={carrera}
              onChange={(e) => setCarrera(+e.target.value)}
            />
          </Grid>
        </Grid>
      </Box>

      <div style={{ height: 700, width: "100%" }}>
        <DataGrid
          disableColumnMenu
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={onColumnVisibilityModelChange}
          components={{ Toolbar: GridToolbarWithoutExport }}
          columns={columns}
          loading={loading}
          rows={actasGrado}
        />
      </div>

      <ConfirmationDialog
        id="close-acta-grado-modal"
        keepMounted={true}
        isVisible={isVisibleC}
        title="Cerrar Acta Grado"
        onCancel={closeModalC}
        onApprove={_cerrarActa}
        textApprove="CERRAR"
        buttonColorApprove="error"
        loading={closing}
      >
        <DialogContentText>
          ¿Está seguro que desea cerrar el acta de grado {" "}
          <strong>{itemSelectedC?.estudiante.nombres}</strong>?
          {" "} 
          <strong>{itemSelectedC?.estudiante.apellidos}</strong>?
        </DialogContentText>
      </ConfirmationDialog>

      <ConfirmationDialog
        id="delete-acta-modal"
        keepMounted={true}
        isVisible={isVisibleDeleteModal}
        title="Eliminar"
        onCancel={closeDeleteModal}
        onApprove={handleDelete}
        textApprove="ELIMINAR"
        buttonColorApprove="error"
        loading={deleting}
      >
        <DialogContentText>
          ¿Está seguro que desea eliminar el acta número{" "}
          <strong>{itemSelectedDeleteModal?.numero}</strong>?
        </DialogContentText>
      </ConfirmationDialog>

      <ConfirmationDialog
        id="generar-numeracion-modal"
        keepMounted={true}
        isVisible={isVisibleGNModal}
        title="Generar numeración"
        onCancel={closeGNModal}
        onApprove={handleGenerarNumeracion}
        textApprove="Generar"
        // buttonColorApprove="error"
        buttonColorCancel="error"
        loading={generating}
      >
        <DialogContentText>
          ¿Está seguro que desea generar la numeración?
        </DialogContentText>
      </ConfirmationDialog>
    </Stack>
  );
};

export default ActasGrado;
