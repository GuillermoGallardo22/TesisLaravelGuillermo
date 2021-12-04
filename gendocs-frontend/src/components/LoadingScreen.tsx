import { CircularProgress } from "@mui/material";

const LoadingScreen = () => {
    return (
        <div style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <CircularProgress size={80} />
        </div>
    );
};

export default LoadingScreen;
