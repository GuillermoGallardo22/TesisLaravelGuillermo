import { Tooltip } from "@mui/material";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import ConfirmationDialog from "components/ConfirmationDialog";
import Icon from "components/Icon";
import {
  INumeracionBase,
  INumeracionReservado,
} from "models/interfaces/INumeracion";
import { useMemo, useState } from "react";
import { deleteReserva } from "services/numeracion";

type NumeracionModalProps = {
  isVisible: boolean;
  onCancel: () => void;
  onApprove: (number: number) => void;
  reservados: INumeracionReservado[];
  encolados: INumeracionBase[];
  onSuccessDeleteR?: () => void;
};

export const NumeracionModal: React.FC<NumeracionModalProps> = ({
  isVisible,
  onCancel,
  onApprove,
  reservados,
  encolados,
  onSuccessDeleteR,
}) => {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [searching, setSearching] = useState(false);

  const handleChange = (
    id: number | string,
    type: "encolados" | "reservados"
  ) => {
    setSearching(true);

    let selected = null;

    if (type === "encolados") {
      selected = encolados.find((e) => e.id === Number(id))?.numero || null;
    } else {
      selected = reservados.find((e) => e.id === Number(id))?.numero || null;
    }

    setSelectedValue(selected);
    setSearching(false);
  };

  const handleOnApprove = () => {
    if (!selectedValue) return;
    onApprove(selectedValue);
    onCancel();
  };

  const nombreConsejos = useMemo(
    () =>
      reservados
        .map((r) => r.consejo.nombre)
        .filter((v, i, a) => a.indexOf(v) === i),
    [reservados]
  );

  const handleDeleteNumeroReservado = (data: INumeracionReservado) => {
    setSearching(true);
    deleteReserva(data.id).finally(() => {
      if (onSuccessDeleteR) {
        onSuccessDeleteR();
      }
      setSearching(false);
    });
  };

  return (
    <ConfirmationDialog
      id="numeracion-modal"
      title="Numeración"
      isVisible={isVisible}
      onCancel={onCancel}
      loading={searching}
      onApprove={handleOnApprove}
      buttonColorCancel="inherit"
      maxWidth="md"
    >
      <Grid container direction="column" gap={2}>
        {reservados.length > 0 && (
          <Grid item>
            <div style={{ height: 380, width: "100%" }}>
              <DataGrid
                pagination
                density="compact"
                rows={reservados}
                onSelectionModelChange={(s) => handleChange(s[0], "reservados")}
                columns={[
                  {
                    field: "numero",
                    headerName: "Números reservados",
                    flex: 1,
                    type: "number",
                    align: "left",
                    headerAlign: "left",
                    valueFormatter: ({ value }) => value,
                  },
                  {
                    field: "consejo",
                    headerName: "Consejo",
                    flex: 1,
                    type: "singleSelect",
                    valueGetter: ({ value }) => value.nombre,
                    valueOptions: nombreConsejos,
                  },
                  {
                    type: "actions",
                    field: "Acciones",
                    headerName: "Acciones",
                    getActions: (p) => [
                      <GridActionsCellItem
                        key={p.id}
                        color="error"
                        disabled={searching}
                        icon={
                          <Tooltip title="Eliminar" arrow>
                            <Icon icon="delete" />
                          </Tooltip>
                        }
                        label="Eliminar"
                        onClick={() => handleDeleteNumeroReservado(p.row)}
                      />,
                    ],
                  },
                ]}
              />
            </div>
          </Grid>
        )}

        {encolados.length > 0 && (
          <Grid item>
            <div style={{ height: 380, width: "100%" }}>
              <DataGrid
                pagination
                density="compact"
                rows={encolados}
                onSelectionModelChange={(s) => handleChange(s[0], "encolados")}
                columns={[
                  {
                    field: "numero",
                    headerName: "Números encolados",
                    flex: 1,
                    type: "number",
                    align: "left",
                    headerAlign: "left",
                    valueFormatter: ({ value }) => value,
                  },
                ]}
              />
            </div>
          </Grid>
        )}

        {!reservados.length && !encolados.length && (
          <Grid item>
            <Alert severity="info">No existe numeración</Alert>
          </Grid>
        )}
      </Grid>
    </ConfirmationDialog>
  );
};
