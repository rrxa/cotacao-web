import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div style={{ width: "250px", background: "#001F7D", color: "#fff", padding: "20px", height: "100vh", position: "fixed" }}>
      <h2>Menu</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li><Link to="/" style={{ color: "#fff", textDecoration: "none" }}>Home</Link></li>
        <li><Link to="/cotacao" style={{ color: "#fff", textDecoration: "none" }}>Cotação</Link></li>
        <li><Link to="/eminuta" style={{ color: "#fff", textDecoration: "none" }}>E-Minuta</Link></li>
        <li><Link to="/rastreio" style={{ color: "#fff", textDecoration: "none" }}>Rastreio</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
