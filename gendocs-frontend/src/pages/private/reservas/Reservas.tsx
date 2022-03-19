import { Stack, Divider, Box } from "@mui/material";
import Title from "components/Title";
import { Outlet } from "react-router-dom";

export default function Reservas() {
    return (
        <Stack gap={2}>
            <Title>Reservas</Title>
            <Divider />
            <Box>
                <Outlet />
            </Box>
        </Stack>
    );
}
