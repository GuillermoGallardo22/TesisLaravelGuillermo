import { Typography } from "@mui/material";
import React from "react";

const Title: React.FC = ({ children }) => {
    return (
        <Typography component="h2" variant="h6">
            {children}
        </Typography>
    );
};

export default Title;
