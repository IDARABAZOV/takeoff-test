import React, {useEffect} from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableContainer from '@mui/material/TableContainer';
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import Paper from '@mui/material/Paper';
import CircularProgress from "@mui/material/CircularProgress";
import {useAppSelector, useAppDispatch} from "../../app/hooks";
import {selectContacts, getStatus, getContacts} from "./ContactsSlice";

const Contacts = () => {
    const dispatch = useAppDispatch();
    const contacts = useAppSelector(selectContacts);
    const status = useAppSelector(getStatus);

    useEffect(() => {
        dispatch(getContacts());
    }, [dispatch])

    return (
        <>
            {status === 'idle' ?
                <Box>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right" sx={{ fontWeight: "bold" }}>ID</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: "bold" }}>Name</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: "bold" }}>Phone</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: "bold" }}>Email</TableCell>
                                    <TableCell colSpan={3}></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {contacts.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="right">{row.id}</TableCell>
                                        <TableCell align="right">{row.name}</TableCell>
                                        <TableCell align="right">{row.phone}</TableCell>
                                        <TableCell align="right">{row.email}</TableCell>
                                        <TableCell align="right">
                                            <Button
                                                variant={"outlined"}
                                                color={"warning"}
                                            >
                                                Edit
                                            </Button>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button
                                                variant={"outlined"}
                                                color={"error"}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Box>
                : <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <CircularProgress />
                </Box>
            }

        </>
    )
}

export default Contacts;