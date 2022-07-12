import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Add = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
    })

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(JSON.stringify({
            name: data.get('name'),
            email: data.get('email'),
            phone: data.get('phone'),
        }))
        return await fetch("/contacts", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: data.get('name'),
                email: data.get('email'),
                phone: data.get('phone'),
            }),
        })
            .then(() => {
                navigate("/")
            })
    }

    return (
        <Container component={"main"} maxWidth={"xs"}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 8,
                }}
            >
                <Typography component="h1" variant="h5">
                    Add
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
                    <TextField
                        name={"name"}
                        fullWidth
                        label="name"
                        variant="outlined"
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        name={"email"}
                        fullWidth
                        label="email"
                        variant="outlined"
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        name={"phone"}
                        fullWidth
                        label="phone"
                        variant="outlined"
                        sx={{ mb: 2 }}
                    />
                    <Box sx={{ display :"flex", justifyContent: "center" }}>
                        <Button
                            color={"error"}
                            sx={{ mr: 2 }}
                            variant="contained"
                            onClick={() => navigate("/")}
                        >
                            Cancel
                        </Button>
                        <Button
                            color={"success"}
                            variant="contained"
                            type={"submit"}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    )
}

export default Add;