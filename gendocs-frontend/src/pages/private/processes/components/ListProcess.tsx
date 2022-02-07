import AddIcon from "@mui/icons-material/Add";
import { Button, Chip, Stack, TextField } from "@mui/material";
import {
    DataGrid,
    GridColDef,
    GridRenderCellParams,
    GridRowId,
} from "@mui/x-data-grid";
import IconButton from "components/IconButton";
import { IPagination, IProceso } from "models/interfaces";
import { useEffect, useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { getProcesos } from "services/proceso";

const PAGE_SIZE = 100;

const columns: GridColDef[] = [
    { field: "nombre", headerName: "Nombre", flex: 1 },
    {
        field: "estado",
        headerName: "Estado",
        width: 120,
        renderCell: (item: GridRenderCellParams) => (
            <Chip
                label={item?.value ? "Activado" : "Desactivado"}
                color={item?.value ? "primary" : "error"}
            />
        ),
    },
    {
        field: "id",
        headerName: "Acciones",
        renderCell: (item: GridRenderCellParams) => (
            <>
                <IconButton
                    icon="article"
                    color="primary"
                    component={RouterLink}
                    tooltipText="Plantillas"
                    to={`${item?.value}/plantillas`}
                />

                <IconButton
                    icon="edit"
                    component={RouterLink}
                    tooltipText="Editar"
                    to={`${item.value}`}
                />
            </>
        ),
    },
];

const ListProcess = () => {
    const pagesNextCursor = useRef<{ [page: number]: GridRowId }>({});

    const [data, setData] = useState<IPagination<IProceso>>({
        data: [],
        links: {
            first: "?page=1",
            last: "?page=1",
        },
        meta: {
            path: "procesos",
            current_page: 1,
            last_page: 1,
            per_page: PAGE_SIZE,
            total: 0,
            links: [],
        },
    });

    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState<boolean>(false);

    const handlePageChange = (newPage: number) => {
        console.log({ newPage });
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

            const response = await getProcesos({ cursor: nextCursor, search });

            if (response.meta.to) {
                pagesNextCursor.current[page] = response.meta.to;
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

                const response = await getProcesos({
                    cursor: nextCursor,
                    search,
                });

                if (response.meta.to) {
                    pagesNextCursor.current[page] = response.meta.to;
                }

                setData(response);
                setLoading(false);
            })();
        }, 600);

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    return (
        <Stack spacing={3}>
            <Button component={RouterLink} startIcon={<AddIcon />} to="nuevo">
                AÑADIR PROCESOS
            </Button>

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
                    pagination
                    paginationMode="server"
                    rowsPerPageOptions={[PAGE_SIZE]}
                    onPageChange={handlePageChange}
                    //
                    columns={columns}
                    page={page}
                    loading={loading}
                    //
                    rows={data.data}
                    pageSize={data.meta.per_page}
                    rowCount={data.meta.total}
                />
            </div>
        </Stack>
    );
};

export default ListProcess;
