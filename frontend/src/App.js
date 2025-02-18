import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cotacao from "./pages/Cotacao";
import EMinuta from "./pages/EMinuta";
import Rastreio from "./pages/Rastreio";
import { Routes, Route } from "react-router-dom"; // ✅ Apenas Routes e Route

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cotacao" element={<Cotacao />} />
        <Route path="/eminuta" element={<EMinuta />} />
        <Route path="/rastreio" element={<Rastreio />} />
      </Routes>
    </>
  );
}

export default App;
