import React from 'react';
import { Routes, Route } from "react-router-dom"
import Home from "./Home";
import Login from "./Login";
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  return (
    <div>
        <CssBaseline />
        <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={"/login"} element={<Login />} />
        </Routes>
    </div>
  );
}

export default App;
