import React, { useState } from "react";

const Rastreio = () => {
  const [codigo, setCodigo] = useState("");

  const handleRastrear = () => {
    window.location.href = `https://www.latamcargo.com/pt/trackshipment?docNumber=${codigo}&docPrefix=957&soType=MAWB`;
  };

  return (
    <div>
      <h2>Rastreio</h2>
      <input 
        type="text" 
        placeholder="Número do Rastreio" 
        value={codigo} 
        onChange={(e) => setCodigo(e.target.value)}
      />
      <button onClick={handleRastrear}>Rastrear</button>
    </div>
  );
};

export default Rastreio;
