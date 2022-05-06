import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Components
import Header from "./components/Header.js";

//Pages
import HomePage from './pages/Home';
import PuntaBanca from "./pages/PuntaBanca.js";
import PuntaPunta from "./pages/PuntaPunta.js";
import Casino from "./pages/Casinò.js";



function App() {
    return (
        <BrowserRouter>
            <Header />

            <Routes>
                <Route path='/' element={<HomePage />}/>
            </Routes>

            <Routes>
                <Route path='/punta-banca' element={<PuntaBanca />} />
                <Route path='/punta-punta' element={<PuntaPunta />} />
                <Route path='/casino' element={<Casino />} />
            </Routes>

        </BrowserRouter>
    );
}

export default App;