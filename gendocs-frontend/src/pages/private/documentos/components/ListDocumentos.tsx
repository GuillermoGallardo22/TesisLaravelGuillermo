import { Button, Stack, TextField } from "@mui/material";
import Icon from "components/Icon";
import { Link } from "react-router-dom";

export default function ListDocumentos() {
    return (
        <Stack spacing={2}>
            <Button
                component={Link}
                startIcon={<Icon icon="add" />}
                to="nuevo"
                variant="outlined"
            >
                CREAR DOCUMENTO
            </Button>

            <TextField
                fullWidth
                margin="normal"
                id="search"
                name="search"
                label="Buscar"
                placeholder=""
                // value={search}
                // onChange={(e) => setSearch(e.target.value)}
            />

            <div style={{ height: 600, width: "100%" }}>
                {/* <DataGrid
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
                /> */}
            </div>
        </Stack>
    );
}
