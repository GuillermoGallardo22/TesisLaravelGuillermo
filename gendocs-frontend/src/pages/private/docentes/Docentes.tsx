import { Divider, Stack } from "@mui/material";
import Title from "components/Title";
import { Outlet } from "react-router-dom";

const Docentes = () => {
    return (
        <Stack gap={2}>
            <Title>Docentes</Title>
            <Divider />
            <Outlet />
        </Stack>
    );
};

export default Docentes;
