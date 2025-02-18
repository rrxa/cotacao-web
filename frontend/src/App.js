import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cotacao from "./pages/Cotacao";
import EMinuta from "./pages/EMinuta";
import Rastreio from "./pages/Rastreio";
import Servicos from "./pages/Servicos";
import Header from "./components/Header";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cotacao" element={<Cotacao />} />
        <Route path="/eminuta" element={<EMinuta />} />
        <Route path="/rastreio" element={<Rastreio />} />
        <Route path="/servicos" element={<Servicos />} />
      </Routes>
    </>
  );
};

export default App;
