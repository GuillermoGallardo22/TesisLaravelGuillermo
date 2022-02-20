import { Box, Divider, Stack } from "@mui/material";
import Title from "components/Title";
import { Outlet } from "react-router-dom";

const Processes = () => {
    return (
        <Stack gap={2}>
            <Title>Procesos</Title>
            <Divider />
            <Box>
                <Outlet />
            </Box>
        </Stack>
    );
};

export default Processes;
