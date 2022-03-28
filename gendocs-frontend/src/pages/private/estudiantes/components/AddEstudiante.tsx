import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography
} from "@mui/material";
import { Icon } from "components";
import { FormEstudiante } from "./FormEstudiante";
import { FormEstudiantes } from "./FormEstudiantes";

const AddStudents = () => {
    return (
        <>
            <Accordion>
                <AccordionSummary
                    expandIcon={<Icon icon="expandMore" />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Agregar estudiante</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormEstudiante />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<Icon icon="expandMore" />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>Agregar multiples estudiantes</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormEstudiantes />
                </AccordionDetails>
            </Accordion>
        </>
    );
};

export default AddStudents;
