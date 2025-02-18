import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // ✅ Verifique se esse arquivo existe!

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/cotacao">Cotação</Link></li>
        <li><Link to="/eminuta">E-Minuta</Link></li>
        <li>
          <input type="text" id="rastreioInput" placeholder="Número do Rastreio" />
          <button 
            onClick={() => {
              const numero = document.getElementById("rastreioInput").value;
              window.location.href = `https://www.latamcargo.com/pt/trackshipment?docNumber=${numero}&docPrefix=957&soType=MAWB`;
            }}>
            Rastrear
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
