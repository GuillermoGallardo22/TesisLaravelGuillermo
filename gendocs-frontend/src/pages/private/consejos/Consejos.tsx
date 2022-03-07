import { Stack, Divider, Box } from "@mui/material";
import Title from "components/Title";
import { Outlet } from "react-router-dom";

export default function Consejos() {
    return (
        <Stack gap={2}>
            <Title>Consejos</Title>
            <Divider />
            <Outlet />
        </Stack>
    );
}
