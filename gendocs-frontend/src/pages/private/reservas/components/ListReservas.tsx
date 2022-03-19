import { Button, Stack } from "@mui/material";
import Icon from "components/Icon";
import { Link } from "react-router-dom";

export default function ListReservas() {
    return (
        <Stack spacing={2}>
            <Button
                component={Link}
                startIcon={<Icon icon="add" />}
                to="nuevo"
                variant="outlined"
            >
                RESERVAR
            </Button>
        </Stack>
    );
}
