import { Stack, Divider, Box } from "@mui/material";
import Title from "components/Title";
import { Outlet } from "react-router-dom";

export default function Facultades() {
    return (
        <Stack gap={2}>
            <Title>Carreras</Title>
            <Divider />
            <Box>
                <Outlet />
            </Box>
        </Stack>
    );
}
