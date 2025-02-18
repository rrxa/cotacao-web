import React, { useState } from "react";
import "./Cotacao.css";

const Cotacao = () => {
  const [formData, setFormData] = useState({
    origem: "",
    destino: "",
    altura: "",
    largura: "",
    comprimento: "",
    peso: "",
    valorSeguro: "0",
  });

  const [resultado, setResultado] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCalcular = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/calcular/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setResultado(data);
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <div className="cotacao-container">
      <h2>Cotação de Frete</h2>
      <div className="form-group">
        <label>CEP de Origem:</label>
        <input type="text" name="origem" value={formData.origem} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>CEP de Destino:</label>
        <input type="text" name="destino" value={formData.destino} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Altura (cm):</label>
        <input type="number" name="altura" value={formData.altura} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Largura (cm):</label>
        <input type="number" name="largura" value={formData.largura} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Comprimento (cm):</label>
        <input type="number" name="comprimento" value={formData.comprimento} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Peso (kg):</label>
        <input type="number" name="peso" value={formData.peso} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label>Valor da Nota Fiscal (R$):</label>
        <input type="number" name="valorSeguro" value={formData.valorSeguro} onChange={handleChange} />
      </div>
      <button onClick={handleCalcular}>Calcular</button>
      {resultado && (
        <div className="resultado">
          <h3>Resultado:</h3>
          <p>Preço do Frete: R$ {resultado.preco}</p>
        </div>
      )}
    </div>
  );
};

export default Cotacao;
