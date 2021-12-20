import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Stack, TextField, IconButton } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams, GridRowId } from "@mui/x-data-grid";
import { IEstudiante, IPagination } from "models/interfaces";
import { useEffect, useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { getEstudiantes } from "services/estudiantes";

const PAGE_SIZE = 100;

const columns: GridColDef[] = [
    { field: "cedula", headerName: "Cédula", width: 110 },
    { field: "apellidos", headerName: "Apellidos", width: 250 },
    { field: "nombres", headerName: "Nombres", width: 250 },
    { field: "celular", headerName: "Celular", width: 110 },
    { field: "telefono", headerName: "Teléfono", width: 110 },
    { field: "correo_uta", headerName: "Correo UTA", width: 250 },
    { field: "correo", headerName: "Correo", width: 250 },
    { field: "matricula", headerName: "Matrícula", width: 100 },
    { field: "folio", headerName: "Folio", width: 100 },
    {
        field: "id", headerName: "Acciones", renderCell: (item: GridRenderCellParams) =>
            <IconButton
                color="primary"
                component={RouterLink}
                to={`${item.value}`}>
                <EditIcon />
            </IconButton>
    },
];

const ListStudents = () => {

    const pagesNextCursor = useRef<{ [page: number]: GridRowId }>({});

    const [data, setData] = useState<IPagination<IEstudiante>>({
        current_page: 0,
        last_page: 0,
        data: [],
        total: 0,
    });

    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState<boolean>(false);

    const handlePageChange = (newPage: number) => {
        // We have the cursor, we can allow the page transition.
        if (newPage === 0 || pagesNextCursor.current[newPage - 1]) {
            setPage(newPage);
        }
    };

    useEffect(() => {
        let active = true;

        (async () => {
            const nextCursor = pagesNextCursor.current[page - 1];

            if (!nextCursor && page > 0) {
                return;
            }

            setLoading(true);

            const response = await getEstudiantes({ cursor: nextCursor, search });

            if (response.next_page_url) {
                pagesNextCursor.current[page] = response.next_page_url;
            }

            if (!active) {
                return;
            }

            setData(response);
            setLoading(false);
        })();

        return () => {
            active = false;
        };
    }, [page]);

    const [search, setSearch] = useState("");

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            (async () => {
                const nextCursor = pagesNextCursor.current[page - 1];

                if (!nextCursor && page > 0) {
                    return;
                }

                setLoading(true);

                const response = await getEstudiantes({ cursor: nextCursor, search });

                if (response.next_page_url) {
                    pagesNextCursor.current[page] = response.next_page_url;
                }

                setData(response);
                setLoading(false);
            })();
        }, 600);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);


    return (
        <Stack spacing={3}>

            <Button
                component={RouterLink}
                startIcon={<AddIcon />}
                to="nuevo"
            >
                AÑADIR ESTUDIANTES
            </Button>

            <TextField
                fullWidth
                margin="normal"
                id="search"
                name="search"
                label="Buscar"
                placeholder="Cédula | Nombres | Apellidos | Matrícula | Folio"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div style={{ height: 600, width: "100%" }}>
                <DataGrid
                    rows={data.data}
                    columns={columns}
                    pagination
                    pageSize={PAGE_SIZE}
                    rowsPerPageOptions={[100]}
                    rowCount={data.total}
                    paginationMode="server"
                    onPageChange={handlePageChange}
                    page={page}
                    loading={loading}
                />
            </div>
        </Stack>
    );
};

export default ListStudents;
