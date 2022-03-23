import {
    FormControl,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    Tooltip,
    Typography,
} from "@mui/material";
import { INumeracionBase } from "models/interfaces";
import ConfirmationDialog from "components/ConfirmationDialog";
import { useCallback, useEffect, useState } from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
} from "./AccordionTheme";

type NumeracionModalProps = {
    isVisible: boolean;
    onCancel: () => void;
    onApprove: (number: number) => void;
    reservados: INumeracionBase[];
    encolados: number[];
    defaultValue?: number;
};

type PanelType = "panel1" | "panel2";

const p1 = JSON.parse(
    localStorage.getItem("isExpandedP1") || "false"
) as boolean;

const p2 = JSON.parse(
    localStorage.getItem("isExpandedP2") || "false"
) as boolean;

export const NumeracionModal: React.FC<NumeracionModalProps> = ({
    isVisible,
    onCancel,
    onApprove,
    reservados,
    encolados,
    defaultValue,
}) => {
    const [selectedValue, setSelectedValue] = useState<number | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(+event.target.value);
    };

    const handleOnApprove = () => {
        if (!selectedValue) return;
        onApprove(selectedValue);
        onCancel();
    };

    useEffect(() => {
        if (isVisible) {
            const inReservado = reservados.find(
                (i) => i.numero === defaultValue
            )?.numero;
            const inEncolado = encolados.find((i) => i === defaultValue);
            setSelectedValue(inReservado || inEncolado || null);
        } else {
            setSelectedValue(null);
        }
    }, [isVisible]);

    const [expanded1, setExpanded1] = useState<boolean>(p1);
    const [expanded2, setExpanded2] = useState<boolean>(p2);

    const handleExpand = (panel: PanelType, isExpanded: boolean) => {
        switch (panel) {
            case "panel1": {
                localStorage.setItem(
                    "isExpandedP1",
                    JSON.stringify(isExpanded)
                );
                setExpanded1(isExpanded);
                break;
            }
            case "panel2": {
                localStorage.setItem(
                    "isExpandedP2",
                    JSON.stringify(isExpanded)
                );
                setExpanded2(isExpanded);
                break;
            }
            default:
                break;
        }
    };

    return (
        <ConfirmationDialog
            id="numeracion-modal"
            title="Numeración"
            isVisible={isVisible}
            onCancel={onCancel}
            onApprove={handleOnApprove}
            buttonColorCancel="inherit"
            maxWidth="md"
        >
            <FormControl component="fieldset" fullWidth>
                <RadioGroup
                    name="numeracion-radio"
                    aria-label="numeracion-radio"
                    value={selectedValue}
                    onChange={handleChange}
                >
                    <Accordion
                        expanded={expanded1}
                        onChange={(_, v) => handleExpand("panel1", v)}
                    >
                        <AccordionSummary id="panel1">
                            <Typography>Números reservados</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container columns={{ xs: 3, sm: 6, md: 10 }}>
                                {reservados.map((i) => (
                                    <Grid item key={i.id} xs={1}>
                                        <Tooltip title={i.consejo.nombre}>
                                            <FormControlLabel
                                                label={i.numero}
                                                value={i.numero}
                                                control={<Radio />}
                                            />
                                        </Tooltip>
                                    </Grid>
                                ))}
                            </Grid>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion
                        expanded={expanded2}
                        onChange={(_, v) => handleExpand("panel2", v)}
                    >
                        <AccordionSummary id="panel2">
                            <Typography>Números encolados</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container columns={{ xs: 3, sm: 6, md: 10 }}>
                                {encolados.map((i) => (
                                    <Grid item key={i} xs={1}>
                                        <FormControlLabel
                                            label={i}
                                            value={i}
                                            control={<Radio />}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </RadioGroup>
            </FormControl>
        </ConfirmationDialog>
    );
};
