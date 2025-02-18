import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/latam-logo.png"; // Adicione o logo na pasta assets

const Header = () => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#350871", padding: "10px 20px", color: "#fff" }}>
      <img src={logo} alt="Latam Cargo" style={{ height: "50px" }} />
      <Link to="/login" style={{ background: "#fff", padding: "5px 10px", borderRadius: "5px", color: "#350871", textDecoration: "none" }}>
        Login
      </Link>
    </div>
  );
};

export default Header;
