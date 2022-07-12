import React, {useEffect} from "react";
import Contacts from "./features/Contacts/Contacts"
import {useNavigate} from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useAppDispatch} from "./app/hooks";
import {liveSearch} from "./features/Contacts/ContactsSlice";

const Home = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token")
        navigate("/login")
    }

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
    })

    return (
        <>
            {localStorage.getItem('token') && (
                <Container maxWidth={"lg"}>
                    {/*Поиск*/}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "2rem 0 0 0",
                            marginBottom: "2rem",
                        }}
                    >
                        <Typography variant={"h3"}>Главная</Typography>
                        <Button
                            variant={"contained"}
                            color={"error"}
                            onClick={logout}
                        >
                            Logout
                        </Button>
                    </Box>
                    {/*Поиск*/}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: "2rem",
                        }}
                    >
                        <Button
                            variant={"contained"}
                            onClick={() => navigate("/add")}
                        >
                            Add
                        </Button>
                        <TextField
                            size={"small"}
                            label="Поиск по имени"
                            variant="outlined"
                            onChange={(e) => {
                                dispatch(liveSearch(e.target.value))
                            }}
                        />
                    </Box>
                    {/*Таблица*/}
                    <Contacts />
                </Container>
            )}
        </>
    )
}

export default Home;