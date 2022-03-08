import { Divider, Stack } from "@mui/material";
import Title from "components/Title";
import { Outlet } from "react-router-dom";

const Student = () => {
    return (
        <Stack gap={2}>
            <Title>Estudiantes</Title>
            <Divider />
            <Outlet />
        </Stack>
    );
};

export default Student;
