import React from "react";
import { Link } from "react-router-dom";
import latamLogo from "../assets/latam-logo.png"; // Certifique-se de que o logo está na pasta correta

const Header = () => {
  return (
    <header style={{ backgroundColor: "#200080", padding: "10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      {/* Logo à esquerda */}
      <img src={latamLogo} alt="LATAM Cargo" style={{ height: "40px", marginLeft: "20px" }} />

      {/* Navegação */}
      <nav>
        <ul style={{ listStyle: "none", display: "flex", gap: "20px", marginRight: "20px" }}>
          <li><Link to="/" style={{ color: "#fff", textDecoration: "none", fontWeight: "bold" }}>Home</Link></li>
          <li><Link to="/cotacao" style={{ color: "#fff", textDecoration: "none", fontWeight: "bold" }}>Cotação</Link></li>
          <li><Link to="/eminuta" style={{ color: "#fff", textDecoration: "none", fontWeight: "bold" }}>E-Minuta</Link></li>
          <li><Link to="/rastreio" style={{ color: "#fff", textDecoration: "none", fontWeight: "bold" }}>Rastreio</Link></li>
          <li><Link to="/servicos" style={{ color: "#fff", textDecoration: "none", fontWeight: "bold" }}>Serviços</Link></li>
          <li><button style={{ backgroundColor: "red", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}>Login</button></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
