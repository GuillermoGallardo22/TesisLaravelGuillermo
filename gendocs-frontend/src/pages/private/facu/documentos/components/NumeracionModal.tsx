import Grid from "@mui/material/Grid";
import { DataGrid } from "@mui/x-data-grid";
import ConfirmationDialog from "components/ConfirmationDialog";
import {
  INumeracionBase,
  INumeracionReservado,
} from "models/interfaces/INumeracion";
import { useMemo, useState } from "react";

type NumeracionModalProps = {
  isVisible: boolean;
  onCancel: () => void;
  onApprove: (number: number) => void;
  reservados: INumeracionReservado[];
  encolados: INumeracionBase[];
};

export const NumeracionModal: React.FC<NumeracionModalProps> = ({
  isVisible,
  onCancel,
  onApprove,
  reservados,
  encolados,
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
              ]}
            />
          </div>
        </Grid>

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
      </Grid>
    </ConfirmationDialog>
  );
};
