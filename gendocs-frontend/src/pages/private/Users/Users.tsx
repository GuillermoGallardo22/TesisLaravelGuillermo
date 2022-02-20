import { Box, Divider, Stack } from "@mui/material";
import Title from "components/Title";
import { Outlet } from "react-router-dom";

const Users: React.FC = () => {
    return (
        <Stack gap={2}>
            <Title>Usuarios</Title>
            <Divider />
            <Box py={2}>
                <Outlet />
            </Box>
        </Stack>
    );
};

export default Users;
