import React, { useState } from "react";
import "../assets/css/Rastreio.css";

function Rastreio() {
  const [docNumber, setDocNumber] = useState("");

  // 🔹 Função para normalizar o número para sempre ter 11 dígitos (957 + 8 dígitos AWB)
  const formatarNumeroRastreio = (num) => {
    let awb = num.startsWith("957") ? num.substring(3) : num; // Remove 957 se já estiver presente
    awb = awb.padStart(8, "0"); // Adiciona zeros à esquerda até ter 8 dígitos
    return `957${awb}`; // Retorna o formato correto
  };

  // 🔹 Função para abrir Melhor Rastreio com o número corrigido
  const abrirMelhorRastreio = () => {
    if (!docNumber) {
      alert("Por favor, insira o número de rastreamento.");
      return;
    }

    const numeroFormatado = formatarNumeroRastreio(docNumber);

    window.open(
      `https://app.melhorrastreio.com.br/app/latam/${numeroFormatado}`,
      "_blank"
    );
  };

  // 🔹 Função para abrir LATAM Cargo sem o prefixo 957, mas corrigido para 8 dígitos
  const abrirLatamCargo = () => {
    if (!docNumber) {
      alert("Por favor, insira o número de rastreamento.");
      return;
    }

    let numeroSemPrefixo = docNumber.startsWith("957")
      ? docNumber.substring(3)
      : docNumber;

    numeroSemPrefixo = numeroSemPrefixo.padStart(8, "0"); // Ajusta para 8 dígitos

    window.open(
      `https://www.latamcargo.com/pt/trackshipment?docNumber=${numeroSemPrefixo}&docPrefix=957&soType=SO`,
      "_blank"
    );
  };

  return (
    <div className="rastreio-container">
      <h2>Rastreio de Encomenda</h2>

      {/* 🔹 Campo de entrada */}
      <div className="rastreio-form">
        <label>Número Operacional:</label>
        <input
          type="text"
          value={docNumber}
          onChange={(e) => setDocNumber(e.target.value)}
          placeholder="Digite o código de rastreamento"
        />
      </div>

      {/* 🔹 Botões */}
      <div className="rastreio-buttons">
        <button onClick={abrirMelhorRastreio} className="btn-azul">
          Rastrear pelo Melhor Envio
        </button>
        <button onClick={abrirLatamCargo} className="btn-verde">
          Rastrear pela LATAM CARGO
        </button>
      </div>
    </div>
  );
}

export default Rastreio;
