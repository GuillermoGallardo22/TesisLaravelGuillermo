import { CircularProgress } from "@mui/material";
import { IPlantilla } from "models/interfaces";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlantillaById } from "services";

const DriveTemplate = () => {
    const { templateId } = useParams<{ templateId: string }>();

    const [submitting, setSubmitting] = useState(true);
    const [template, setTemplate] = useState<IPlantilla | null>(null);

    useEffect(() => {
        if (!templateId) return;

        getPlantillaById(+templateId)
            .then((r) => setTemplate(r.data))
            .finally(() => setSubmitting(false));
    }, []);

    return !templateId ? (
        <h4>404</h4>
    ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
            {submitting || !template ? (
                <CircularProgress size={50} />
            ) : (
                <iframe
                    width="100%"
                    height="700px"
                    src={`https://docs.google.com/document/d/${template.drive}/edit?embedded=true`}
                    allowFullScreen
                />
            )}
        </div>
    );
};

export default DriveTemplate;
