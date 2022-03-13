import { Stack, Divider, Box } from "@mui/material";
import Title from "components/Title";
import { Outlet } from "react-router-dom";

export default function Documentos() {
    return (
        <Stack gap={2}>
            <Title>Documentos</Title>
            <Divider />
            <Box>
                <Outlet />
            </Box>
        </Stack>
    );
}
