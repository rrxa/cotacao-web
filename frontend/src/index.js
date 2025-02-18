import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // ✅ Importando corretamente
import App from "./App";
import "./assets/css/custom-style.css"; // Certifique-se que este arquivo existe

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}> 
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);
