import React from 'react';
import { Routes, Route } from "react-router-dom"
import Home from "./Home";
import Login from "./Login";
import Add from "./Add";
import Edit from "./Edit";
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  return (
    <div>
        <CssBaseline />
        <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/login"} element={<Login />} />
            <Route path={"/add"} element={<Add />} />
            <Route path={"/edit/:contactId"} element={<Edit />} />
        </Routes>
    </div>
  );
}

export default App;
