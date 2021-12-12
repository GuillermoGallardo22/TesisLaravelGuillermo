import { Box, Divider, Paper } from "@mui/material";
import Title from "components/Title";
import { Outlet } from "react-router-dom";

const Student = () => {

    return (
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Title>Estudiantes</Title>
            <Divider />
            <Box py={2} >
                <Outlet />
            </Box>
        </Paper >
    );
};

export default Student;
