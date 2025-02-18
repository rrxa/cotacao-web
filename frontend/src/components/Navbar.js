import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // ✅ Certifique-se de que esse arquivo existe!

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/cotacao">Cotação</Link></li>
        <li><Link to="/eminuta">E-Minuta</Link></li>
        <li><Link to="/rastreio">Rastreio</Link></li> {/* Novo botão de rastreamento */}
      </ul>
    </nav>
  );
};

export default Navbar;
