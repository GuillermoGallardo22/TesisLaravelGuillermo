import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";

export function GridToolbarColumns() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
    </GridToolbarContainer>
  );
}

// const GridToolbarExport = ({ csvOptions, printOptions, ...other }) => (
//   <GridToolbarExportContainer {...other}>
//     <GridCsvExportMenuItem options={csvOptions} />
//     <GridPrintExportMenuItem options={printOptions} />
//   </GridToolbarExportContainer>
// );

export function GridToolbarWithoutExport() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport
        csvOptions={{
          fileName: 'ActaGrado',
          delimiter: ';',
          utf8WithBom: true,
          // fields: ['numero', 'docente','informacion_adicional']
        }}
      />

{/* componentsProps={{ toolbar: { csvOptions: { fields: ['destinatario', 'plantilla'] } } }} */}

    </GridToolbarContainer>
  );
}
