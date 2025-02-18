import React, { useState } from "react";

function Rastreio() {
    const [docNumber, setDocNumber] = useState("");
    const [docPrefix, setDocPrefix] = useState("957"); // Prefixo padrão
    const [soType, setSoType] = useState("SO"); // Tipo Doméstico

    const gerarLinkRastreio = () => {
        if (!docNumber) {
            alert("Por favor, insira o número do AWB.");
            return;
        }
        const url = `https://www.latamcargo.com/pt/trackshipment?docNumber=${docNumber}&docPrefix=${docPrefix}&soType=${soType}`;
        window.location.href = url;
    };

    return (
        <div>
            <h2>Rastreio de Encomenda</h2>
            <label>Tipo:</label>
            <select value={soType} onChange={(e) => setSoType(e.target.value)}>
                <option value="SO">Doméstico</option>
                <option value="MAWB">Internacional</option>
            </select>
            <label>Prefixo:</label>
            <input
                type="text"
                value={docPrefix}
                onChange={(e) => setDocPrefix(e.target.value)}
            />
            <label>Número do AWB:</label>
            <input
                type="text"
                value={docNumber}
                onChange={(e) => setDocNumber(e.target.value)}
            />
            <button onClick={gerarLinkRastreio}>>*</button>
        </div>
    );
}

export default Rastreio;
