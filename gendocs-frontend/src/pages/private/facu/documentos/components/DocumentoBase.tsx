import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DialogContentText from "@mui/material/DialogContentText";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid, GridActionsCellItem, GridColumns } from "@mui/x-data-grid";
import ConfirmationDialog from "components/ConfirmationDialog";
import Icon from "components/Icon";
import Select from "components/Select";
import TitleNav from "components/TitleNav";
import { GridToolbarWithoutExport } from "components/ToolbarDataGrid";
import { useAuthContext } from "contexts/AuthContext";
import { useModuleContext } from "contexts/ModuleContext";
import { useConfirmationDialog } from "hooks/useConfirmationDialog";
import { useGridColumnVisibilityModel } from "hooks/useGridColumnVisibilityModel";
import { useConsejos } from "hooks/useQuery";
import { IDocumento } from "models/interfaces/IDocumento";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { updateDocumento } from "services/documentos";
import { CONSTANTS } from "utils/constants";
import {
  generateLink,
  getAutor,
  getCreado,
  getNombreCompleto,
  getPlantilla,
  getProceso,
  getTooltipTextNotification,
} from "utils/libs";
import { useListDocumentos } from "../hooks/useListDocumentos";
import { NotificationEmail } from "./NotificationEmail";

const DocumentosBase = () => {
  const [consejo, setConsejo] = useState(-1);
  const { module } = useModuleContext();

  const { data: consejos = [] } = useConsejos({
    filters: {
      module,
    },
  });

  useEffect(() => {
    if (consejos.length) {
      setConsejo(consejos[0].id);
    }
  }, [consejos]);

  const {
    documentos,
    loading,
    //
    confirmationDialog: { isVisible, openModal, closeModal, itemSelected },
    deleteItem: { handleDelete, deleting },
    refetch: refetchDocumentos,
  } = useListDocumentos(consejo);

  const {
    context: { user },
  } = useAuthContext();

  const {
    isVisible: isVisibleNE,
    openModal: openModalNE,
    closeModal: closeModalNE,
    itemSelected: itemSelectedNE,
  } = useConfirmationDialog<IDocumento>();

  const { columnVisibilityModel, onColumnVisibilityModelChange } =
    useGridColumnVisibilityModel({
      key: "documentosTableModel",
    });

  const handleCloseNotification = () => {
    closeModalNE();
    refetchDocumentos();
  };

  const columns = useMemo(
    (): GridColumns => [
      {
        type: "number",
        field: "numero",
        headerName: "Número",
        // width: 110,
      },
      {
        field: "destinatario",
        headerName: "Destinatario",
        flex: 1.5,
        valueGetter: getNombreCompleto,
      },
      {
        field: "plantilla",
        headerName: "Plantilla",
        valueGetter: getPlantilla,
        flex: 1,
      },
      {
        field: "proceso",
        headerName: "Proceso",
        valueGetter: getProceso,
        flex: 1,
      },
      {
        field: "autor",
        headerName: "Autor",
        valueGetter: getAutor,
        flex: 1,
      },
      {
        field: "descripcion",
        headerName: "Descripción",
        flex: 1,
      },
      {
        type: "dateTime",
        field: "creado",
        headerName: "F. creación",
        valueFormatter: getCreado,
        flex: 1,
      },
      {
        type: "actions",
        field: "notificaciones",
        headerName: "Notificaciones",
        width: 120,
        getActions: (p) =>
          [
            p.row?.estudiante?.celular && (
              <GridActionsCellItem
                key={p.id}
                LinkComponent={"a"}
                href={generateLink(p.row as IDocumento, user.name)}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: p.row.notificado_w
                    ? CONSTANTS.DISABLED_COLOR
                    : CONSTANTS.WHATSAPP_COLOR,
                }}
                icon={
                  <Tooltip
                    title={getTooltipTextNotification(p.row.notificado_w, "w")}
                    arrow
                  >
                    <Icon icon="whatsApp" />
                  </Tooltip>
                }
                label={getTooltipTextNotification(p.row.notificado_w, "w")}
                onClick={() =>
                  updateDocumento(p.row.id, {
                    notificado_w: true,
                  }).finally(() => {
                    refetchDocumentos();
                  })
                }
              />
            ),
            p.row?.estudiante?.correo_uta && (
              <GridActionsCellItem
                key={p.id}
                sx={{
                  color: p.row.notificado_e
                    ? CONSTANTS.DISABLED_COLOR
                    : CONSTANTS.EMAIL_COLOR,
                }}
                icon={
                  <Tooltip
                    title={getTooltipTextNotification(p.row.notificado_e, "e")}
                    arrow
                  >
                    <Icon icon="email" />
                  </Tooltip>
                }
                label={getTooltipTextNotification(p.row.notificado_e, "e")}
                onClick={() => openModalNE(p.row)}
              />
            ),
          ].filter(Boolean),
      },
      {
        type: "actions",
        field: "acciones",
        headerName: "Acciones",
        getActions: (p) => [
          <GridActionsCellItem
            key={p.id}
            color="primary"
            LinkComponent={Link}
            disabled={!p.row.drive}
            to={`drive/${p.row.drive}`}
            icon={
              <Tooltip title="Ver documento" arrow>
                <Icon icon="article" />
              </Tooltip>
            }
            label="Ver documento"
          />,
          <GridActionsCellItem
            key={p.id}
            color="error"
            icon={
              <Tooltip title="Eliminar" arrow>
                <Icon icon="delete" />
              </Tooltip>
            }
            label="Eliminar documento"
            onClick={() => openModal(p.row as IDocumento)}
          />,
        ],
      },
    ],
    []
  );

  return (
    <Stack spacing={2}>
      <TitleNav title="Documentos" goback={false} />

      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              component={Link}
              startIcon={<Icon icon="add" />}
              to="nuevo"
              variant="outlined"
            >
              CREAR DOCUMENTO
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              component={Link}
              startIcon={<Icon icon="numbers" />}
              to="reservar"
              variant="outlined"
            >
              RESERVAR NUMERACIÓN
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Select
              id="consejo"
              name="consejo"
              label="Consejo"
              items={consejos.map((i) => ({
                id: i.id,
                label: i.nombre,
              }))}
              value={consejo}
              onChange={(e) => setConsejo(+e.target.value)}
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
          rows={documentos}
        />
      </div>

      <NotificationEmail
        documento={itemSelectedNE}
        isVisible={isVisibleNE}
        closeModal={handleCloseNotification}
      />

      {itemSelected && (
        <ConfirmationDialog
          id="delete-documento-modal"
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
            ¿Está seguro que desea eliminar el documento número{" "}
            <strong>{itemSelected.numero}</strong>?
          </DialogContentText>
        </ConfirmationDialog>
      )}
    </Stack>
  );
};

export default DocumentosBase;
