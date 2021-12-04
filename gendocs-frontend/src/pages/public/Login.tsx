import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { useAuthContext } from "contexts/AuthContext";
import { AuthActionsEnum } from "reducers/AuthReducer";

const Login = () => {

    const {
        dispatch,
    } = useAuthContext();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setTimeout(() => {
            dispatch({
                type: AuthActionsEnum.setIsAuth, payload: {
                    id: 1,
                    name: "Juan",
                    email: "juan@gmail.com"
                }
            });
            dispatch({ type: AuthActionsEnum.setIsAuth, payload: true });
        }, 1000);

    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <img
                    src="https://fisei.uta.edu.ec/v4.0/images/logo-sitio-fisei-2020.png"
                    alt="logo-fisei"
                    loading="lazy"
                    width="100%"
                />

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        required
                        autoFocus
                        fullWidth
                        margin="normal"
                        id="email"
                        name="email"
                        label="Email"
                        autoComplete="email"
                        error
                        helperText={"Campo requerido"}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        name="password"
                        type="password"
                        label="Contaseña"
                        autoComplete="current-password"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Ingresar
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
