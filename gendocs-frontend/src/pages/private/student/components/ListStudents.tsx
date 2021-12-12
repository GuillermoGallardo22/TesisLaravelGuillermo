import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Link as MaterialLink } from "@mui/material";
// import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";

const ListStudents = () => {
    return (
        <>
            <Button
                component={RouterLink}
                startIcon={<AddIcon />}
                to="nuevo"
            >
                Añadir
            </Button>
        </>
    );
};

export default ListStudents;
