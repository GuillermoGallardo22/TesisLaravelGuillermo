import Typography from "@mui/material/Typography";

const Title: React.FC = ({ children }) => {
    return (
        <Typography component="h2" variant="h6">
            {children}
        </Typography>
    );
};

export default Title;
