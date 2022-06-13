import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DialogContentText from "@mui/material/DialogContentText";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import { GridActionsCellItem, GridColumns } from "@mui/x-data-grid";
import {
  ChipStatus,
  ConfirmationDialog,
  DataGrid,
  Icon,
  TitleNav,
} from "components";
import { useModuleContext } from "contexts/ModuleContext";
import {
  useConfirmationDialog,
  useDeleteItem,
  useFilterPagination,
  usePlantillasGlob,
} from "hooks";
import { ModuleEnum, PlantillasGlobales } from "models/enums";
import { IConsejo } from "models/interfaces";
import ModuleProvider from "providers/ModuleProvider";
import { useMemo, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { cerrarConsejo, deleteConsejo, getConsejos } from "services";
import { parseToDateTime } from "utils";

export const Consejos = () => {
  const [token, setToken] = useState(1);
  const { module } = useModuleContext();

  const {
    data,
    handlePageChange,
    handlePageSizeChange,
    loading,
    search,
    setSearch,
  } = useFilterPagination({
    fetch: getConsejos,
    filters: {
      module,
    },
    token: token,
  });

  const { data: plaAct, isLoading: loadingPlaAct } = usePlantillasGlob(
    PlantillasGlobales.PLA_ACT
  );

  const { data: plaActSep, isLoading: loadingPlaActSep } = usePlantillasGlob(
    PlantillasGlobales.PLA_ACT_SEP
  );

  const [isVisible, setIsVisible] = useState(false);

  const [itemSelected, setItemSelected] = useState<IConsejo | null>(null);

  const openModal = (item: IConsejo) => {
    setItemSelected(item);
    setIsVisible(true);
  };

  const closeModal = () => {
    setIsVisible(false);
    // setItemSelected(null);
  };

  const { deleting, handleDelete } = useDeleteItem({
    id: itemSelected?.id,
    onDelete: deleteConsejo,
    callback: () => {
      setToken(Date.now());
      closeModal();
    },
  });

  const {
    isVisible: isVisibleC,
    openModal: openModalC,
    closeModal: closeModalC,
    itemSelected: itemSelectedC,
  } = useConfirmationDialog<IConsejo>();

  const { deleting: closing, handleDelete: _cerrarConsejo } = useDeleteItem({
    id: itemSelectedC?.id,
    onDelete: cerrarConsejo,
    callback: () => {
      setToken(Date.now());
      closeModalC();
    },
  });

  const columns = useMemo(
    (): GridColumns => [
      { field: "nombre", headerName: "Nombre", flex: 1 },
      {
        field: "fecha",
        headerName: "Fecha",
        flex: 1,
        renderCell: (item) => parseToDateTime(item.value),
      },
      {
        field: "tipo_consejo",
        headerName: "Tipo",
        width: 120,
        renderCell: (item) => item.value.nombre,
      },
      {
        field: "estado",
        headerName: "Estado",
        renderCell: (item) => (
          <ChipStatus
            value={item.value}
            textPrimary="Abierto"
            textSecondary="Cerrado"
            colorSecondary="success"
          />
        ),
      },
      {
        type: "actions",
        field: "actions",
        headerName: "Acciones",
        width: 250,
        getActions: (p) => [
          <GridActionsCellItem
            key={p.id}
            disabled={!p.row.estado}
            color="primary"
            label="Editar"
            LinkComponent={Link}
            to={p.row?.id + ""}
            icon={
              <Tooltip title="Editar" arrow>
                <Icon icon="edit" />
              </Tooltip>
            }
          />,
          <GridActionsCellItem
            key={p.id}
            color="primary"
            label="Asistencia"
            LinkComponent={Link}
            to={p.row?.id + "/asistencia"}
            icon={
              <Tooltip title="Asistencia" arrow>
                <Icon icon="playlistAddCheck" />
              </Tooltip>
            }
          />,
          <GridActionsCellItem
            key={p.id}
            color="success"
            label="Acta"
            LinkComponent={Link}
            to={p.row?.id + "/acta"}
            icon={
              <Tooltip title="Acta" arrow>
                <Icon icon="historyEdu" />
              </Tooltip>
            }
          />,
          <GridActionsCellItem
            key={p.id}
            color="secondary"
            label="Resoluciones"
            LinkComponent={Link}
            to={p.row?.id + "/resoluciones"}
            icon={
              <Tooltip title="Resoluciones" arrow>
                <Icon icon="article" />
              </Tooltip>
            }
          />,
          <GridActionsCellItem
            key={p.id}
            disabled={!p.row.estado}
            color="warning"
            label="Cerrar"
            icon={
              <Tooltip title="Cerrar" arrow>
                <Icon icon="lock" />
              </Tooltip>
            }
            onClick={() => openModalC(p.row as IConsejo)}
          />,
          <GridActionsCellItem
            key={p.id}
            disabled={!p.row.estado}
            color="error"
            label="Eliminar"
            icon={
              <Tooltip title="Eliminar" arrow>
                <Icon icon="delete" />
              </Tooltip>
            }
            onClick={() => openModal(p.row as IConsejo)}
          />,
        ],
      },
    ],
    []
  );

  return (
    <>
      <Stack spacing={2}>
        <TitleNav title="Consejos" goback={false} />

        <Box>
          <Grid container spacing={2} columns={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={1} sm={2} md={1}>
              <Button
                fullWidth
                component={Link}
                startIcon={<Icon icon="add" />}
                to="nuevo"
                variant="outlined"
              >
                AÑADIR CONSEJO
              </Button>
            </Grid>
            <Grid item xs={1}>
              <LoadingButton
                fullWidth
                component={Link}
                startIcon={<Icon icon="article" />}
                to={"plantilla-acta/" + plaAct?.drive}
                variant="outlined"
                loading={loadingPlaAct}
                disabled={!plaAct}
              >
                PLANTILLA ACTA
              </LoadingButton>
            </Grid>
            <Grid item xs={1}>
              <LoadingButton
                fullWidth
                component={Link}
                startIcon={<Icon icon="article" />}
                to={"plantilla-separador/" + plaActSep?.drive}
                variant="outlined"
                loading={loadingPlaActSep}
                disabled={!plaActSep}
              >
                PLANTILLA SEPARADOR
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>

        <TextField
          fullWidth
          margin="normal"
          id="search"
          name="search"
          label="Buscar"
          placeholder="Nombre"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div style={{ height: 600, width: "100%" }}>
          <DataGrid
            disableColumnMenu
            pagination
            paginationMode="server"
            onPageSizeChange={handlePageSizeChange}
            onPageChange={handlePageChange}
            //
            columns={columns}
            loading={loading}
            //
            rows={data.data}
            page={data.meta.current_page}
            pageSize={data.meta.per_page}
            rowCount={data.meta.total}
          />
        </div>
      </Stack>

      <ConfirmationDialog
        id="close-consejo-modal"
        keepMounted={true}
        isVisible={isVisibleC}
        title="Cerrar consejo"
        onCancel={closeModalC}
        onApprove={_cerrarConsejo}
        textApprove="CERRAR"
        buttonColorApprove="error"
        loading={closing}
      >
        <DialogContentText>
          ¿Está seguro que desea cerrar el consejo{" "}
          <strong>{itemSelectedC?.nombre}</strong>?
        </DialogContentText>
      </ConfirmationDialog>

      <ConfirmationDialog
        id="delete-consejo-modal"
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
    </>
  );
};

export const ConsejosOutlet = () => (
  <ModuleProvider module={ModuleEnum.FACU}>
    <Outlet />
  </ModuleProvider>
);
