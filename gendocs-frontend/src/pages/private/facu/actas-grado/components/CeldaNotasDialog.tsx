import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Tooltip,
} from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  gridClasses,
  GridColumns,
  GridRowParams,
} from "@mui/x-data-grid";
import ConfirmationDialog from "components/ConfirmationDialog";
import Icon from "components/Icon";
import { ITipoActaGrado } from "models/interfaces/IActaGrado";
import { ICeldaNota } from "models/interfaces/ICeldaNota";
import { useMemo } from "react";
import { useCeldaNotas } from "../hooks/useCeldaNotas";
import AddCelda from "./AddCelda";

type CeldaNotasDialogProps = {
  isVisible: boolean;
  selected: ITipoActaGrado | null;
  onCloseModal: () => void;
};

const CeldaNotasDialog: React.FunctionComponent<CeldaNotasDialogProps> = ({
  isVisible,
  selected,
  onCloseModal,
}) => {
  const {
    celdasNotas,
    isLoading,
    //
    confirmationDialog: {
      isVisible: isVisibleDeleteModal,
      openModal: openDeleteModal,
      closeModal: closeDeleteModal,
      itemSelected: itemSelectedDeleteModal,
    },
    deleteItem: { handleDelete, deleting },
  } = useCeldaNotas({
    filters: {
      tipoActa: selected?.id,
    },
  });

  const columns = useMemo(
    (): GridColumns => [
      {
        field: "descripcion",
        headerName: "Descripción",
        flex: 1,
      },
      {
        field: "celda",
        headerName: "Celda",
        flex: 1,
      },
      {
        type: "actions",
        field: "acciones",
        headerName: "Calificaciones",
        width: 150,
        getActions: (p: GridRowParams<ICeldaNota>) => [
          <GridActionsCellItem
            key="celdas"
            color="error"
            icon={
              <Tooltip title="Eliminar" arrow>
                <Icon icon="delete" />
              </Tooltip>
            }
            label="Eliminar"
            onClick={() => {
              openDeleteModal(p.row);
            }}
          />,
        ],
      },
    ],
    [celdasNotas.length]
  );

  return (
    <>
      <Dialog
        id="dialog-celda-calificaciones"
        sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: "80%" } }}
        maxWidth="lg"
        open={isVisible}
        scroll="paper"
        keepMounted={true}
      >
        <DialogTitle>Celdas</DialogTitle>
        <DialogContent dividers>
          <Grid container direction="column" spacing={2}>
            <Grid item xs={4} sm={4}>
              {selected && <AddCelda tipoActa={selected} />}
            </Grid>
            <Grid item xs={4} sm={4}>
              <div style={{ height: 500, width: "100%" }}>
                <DataGrid
                  getRowHeight={() => "auto"}
                  sx={{
                    [`& .${gridClasses.cell}`]: {
                      py: 1,
                    },
                  }}
                  disableColumnMenu
                  columns={columns}
                  loading={isLoading}
                  rows={celdasNotas}
                />
              </div>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            onClick={onCloseModal}
            // color={buttonColorCancel}
            // disabled={loading}
            // {...onCancelButtonProps}
          >
            Cerrar
          </LoadingButton>

          {/* <LoadingButton
              onClick={onApprove}
              color={buttonColorApprove}
              disabled={loading}
              loading={loading}
              {...onApproveButtonProps}
            >
              {textApprove}
            </LoadingButton> */}
        </DialogActions>
      </Dialog>

      <ConfirmationDialog
        id="delete-dialog-celda-calificaciones"
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
          ¿Está seguro que desea eliminar el la celda{" "}
          <strong>{itemSelectedDeleteModal?.celda}</strong>?
        </DialogContentText>
      </ConfirmationDialog>
    </>
  );
};

export default CeldaNotasDialog;
