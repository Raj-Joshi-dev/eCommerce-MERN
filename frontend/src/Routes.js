import React from 'react'
import Home from './core/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function MyRoutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' exact element={<Home />} />
        </Routes>
    </BrowserRouter>
  )
}
