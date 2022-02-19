import { Box, Divider, Paper } from "@mui/material";
import Title from "components/Title";
import { Outlet } from "react-router-dom";

const Users: React.FC = () => {
    return (
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Title>Usuarios</Title>
            <Divider />
            <Box py={2}>
                <Outlet />
            </Box>
        </Paper>
    );
};

export default Users;
