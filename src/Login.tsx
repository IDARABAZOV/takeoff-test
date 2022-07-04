import React, {useState} from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom"

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState<string>("")

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const response = await fetch("/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: data.get('email'),
                password: data.get('password'),
            }),
        })
        const result = await response.json();
        if(result.accessToken) {
            localStorage.setItem('token', result.accessToken);
            navigate('/');
        }
        if(!result.accessToken) {
            setError(result);
        }
    }

    return (
        <Container component={"main"} maxWidth={"xs"}>
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
                <Avatar sx={{ m: 1, backgroundColor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Typography
                        variant={"subtitle2"}
                        sx={{
                            display: error ? "block" : "none",
                            color: "error.light"
                        }}
                    >{error}</Typography>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default Login;