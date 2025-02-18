import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [trackingNumber, setTrackingNumber] = useState("");

  const handleTrack = () => {
    if (trackingNumber.trim() !== "") {
      const trackingURL = `https://www.latamcargo.com/pt/trackshipment?docNumber=${trackingNumber}&docPrefix=957&soType=MAWB`;
      window.open(trackingURL, "_blank");
    }
  };

  return (
    <header className="header-container">
      <div className="header-top"></div> {/* Barra superior vermelha */}
      <nav className="header-nav">
        <div className="logo">COTAÇÃO</div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/cotacao">Cotação</Link></li>
          <li><a href="https://www.latamcargo.com/pt/eminutaclient" target="_blank" rel="noopener noreferrer">E-Minuta</a></li>
          <li className="rastreio">
            <input
              type="text"
              placeholder="Número do Rastreio"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
            />
            <button onClick={handleTrack}>Rastrear</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
