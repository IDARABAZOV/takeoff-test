import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Edit = () => {
    const {contactId} = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");


    // Get contact by id
    useEffect(() => {
        fetch(`/contacts/${contactId}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
        })
            .then(response => response.json())
            .then(data => {
                setName(data.name)
                setEmail(data.email)
                setPhone(data.phone)
            })
    }, [contactId])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        return await fetch(`/contacts/${contactId}`, {
            method: "PUT",
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
            .then(() => navigate("/"))
            .catch((error) => console.log(error));
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
                    Edit
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
                    <TextField
                        name={"name"}
                        fullWidth
                        label="name"
                        variant="outlined"
                        sx={{ mb: 2 }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        name={"email"}
                        fullWidth
                        label="email"
                        variant="outlined"
                        sx={{ mb: 2 }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        name={"phone"}
                        fullWidth
                        label="phone"
                        variant="outlined"
                        sx={{ mb: 2 }}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
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

export default Edit