import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Cotacao = () => {
  const [form, setForm] = useState({
    cepOrigem: "74705340",
    cepDestino: "",
    altura: "",
    largura: "",
    comprimento: "",
    peso: "",
    valorNotaFiscal: "",
    entregaDomicilio: false,
    pagamentoOrigem: true,
    pagamentoDestino: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const calcularCotacao = () => {
    if (form.pagamentoDestino && form.entregaDomicilio) {
      alert("Pagamento no destino não é permitido para entrega a domicílio. O pagamento deve ser na origem.");
      return;
    }
    
    console.log("Cotação enviada:", form);
    // Aqui você pode enviar os dados para a API do backend
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flexGrow: 1, padding: "20px", marginLeft: "250px" }}>
        <Header />
        <h1>Calculadora de Frete</h1>
        <div>
          <label>CEP de Origem:</label>
          <input type="text" value={form.cepOrigem} disabled />

          <label>CEP de Destino:</label>
          <input type="text" name="cepDestino" value={form.cepDestino} onChange={handleChange} />

          <label>Altura (cm):</label>
          <input type="number" name="altura" value={form.altura} onChange={handleChange} />

          <label>Largura (cm):</label>
          <input type="number" name="largura" value={form.largura} onChange={handleChange} />

          <label>Comprimento (cm):</label>
          <input type="number" name="comprimento" value={form.comprimento} onChange={handleChange} />

          <label>Peso (kg):</label>
          <input type="number" name="peso" value={form.peso} onChange={handleChange} />

          <label>Valor da Nota Fiscal (R$):</label>
          <input type="number" name="valorNotaFiscal" value={form.valorNotaFiscal} onChange={handleChange} />

          <label>Entrega a Domicílio:</label>
          <input type="checkbox" name="entregaDomicilio" checked={form.entregaDomicilio} onChange={handleChange} />

          <label>Pagamento na Origem:</label>
          <input type="checkbox" name="pagamentoOrigem" checked={form.pagamentoOrigem} onChange={handleChange} />

          <label>Pagamento no Destino:</label>
          <input type="checkbox" name="pagamentoDestino" checked={form.pagamentoDestino} onChange={handleChange} />

          <button onClick={calcularCotacao}>Calcular</button>
        </div>
      </div>
    </div>
  );
};

export default Cotacao;
