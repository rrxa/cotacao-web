import React, { useState } from "react";
import "../assets/css/Cotacao.css";


const Cotacao = () => {
  // Estado inicial
  const [form, setForm] = useState({
    cepOrigem: "74705340",
    cepDestino: "",
    valorNotaFiscal: "",
    entregaDomicilio: false,
    pagamentoOrigem: false,
    pagamentoDestino: false,
    volumes: [{ altura: 10, largura: 10, comprimento: 10, peso: 0 }],
  });

  // Atualiza os campos do formulário
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Atualiza os volumes
  const handleVolumeChange = (index, e) => {
    const { name, value } = e.target;
    const newVolumes = [...form.volumes];
    newVolumes[index][name] = value;
    setForm({ ...form, volumes: newVolumes });
  };

  // Adiciona novo volume
  const addVolume = () => {
    setForm((prevForm) => ({
      ...prevForm,
      volumes: [...prevForm.volumes, { altura: 10, largura: 10, comprimento: 10, peso: 0 }],
    }));
  };

  // Remove um volume
  const removeVolume = (index) => {
    const newVolumes = form.volumes.filter((_, i) => i !== index);
    setForm({ ...form, volumes: newVolumes });
  };

  // Reseta o formulário
  const limparFormulario = () => {
    setForm({
      cepOrigem: "74705340",
      cepDestino: "",
      valorNotaFiscal: "",
      entregaDomicilio: false,
      pagamentoOrigem: false,
      pagamentoDestino: false,
      volumes: [{ altura: 10, largura: 10, comprimento: 10, peso: 0 }],
    });
  };

  // Lógica para validar regras de pagamento
  const validarPagamento = () => {
    if (form.entregaDomicilio && form.pagamentoDestino) {
      alert("Pagamento no destino não é permitido para entrega a domicílio. O pagamento deve ser na origem.");
      setForm((prevForm) => ({
        ...prevForm,
        pagamentoDestino: false,
        pagamentoOrigem: true,
      }));
    }
  };

  // Simulação de cotação (substituir por API no futuro)
  const calcularCotacao = () => {
    console.log("Cotação enviada:", form);
    // Aqui viria a integração com o backend para calcular o frete
  };

  return (
    <div className="cotacao-container">
      <h1>Calculadora de Frete</h1>

      <div className="form-container">
        <div className="coluna-esquerda">
          <label>Origem:</label>
          <input type="text" value="GOIANIA-GO" disabled />

          <label>CEP de Destino:</label>
          <input type="text" name="cepDestino" value={form.cepDestino} onChange={handleChange} />

          <label>Valor total dos Produtos:</label>
          <input type="text" name="valorNotaFiscal" value={form.valorNotaFiscal} onChange={handleChange} />
        </div>

        <div className="coluna-direita">
          <div className="checkbox-group">
            <strong>Entrega a Domicílio</strong>
            <input type="checkbox" name="entregaDomicilio" checked={form.entregaDomicilio} onChange={handleChange} />
          </div>

          <div className="checkbox-group">
            <strong>Pagamento</strong>
            <label><input type="checkbox" name="pagamentoOrigem" checked={form.pagamentoOrigem} onChange={handleChange} /> Remetente</label>
            <label><input type="checkbox" name="pagamentoDestino" checked={form.pagamentoDestino} onChange={handleChange} onBlur={validarPagamento} /> Destinatário</label>
          </div>
        </div>
      </div>

      <div className="volumes-container">
        <h3>Dados do Volume</h3>
        {form.volumes.map((volume, index) => (
          <div key={index} className="volume-box">
            <label>Altura*</label>
            <input type="number" name="altura" value={volume.altura} onChange={(e) => handleVolumeChange(index, e)} />

            <label>Largura*</label>
            <input type="number" name="largura" value={volume.largura} onChange={(e) => handleVolumeChange(index, e)} />

            <label>Comprimento*</label>
            <input type="number" name="comprimento" value={volume.comprimento} onChange={(e) => handleVolumeChange(index, e)} />

            <label>Peso*</label>
            <input type="number" name="peso" value={volume.peso} onChange={(e) => handleVolumeChange(index, e)} />

            {index > 0 && (
              <button className="delete-button" onClick={() => removeVolume(index)}>🗑️</button>
            )}
          </div>
        ))}
        <button className="add-button" onClick={addVolume}>+ Adicionar Volume</button>
      </div>

      <div className="button-group">
        <button className="limpar-button" onClick={limparFormulario}>LIMPAR</button>
        <button className="calcular-button" onClick={calcularCotacao}>CALCULAR</button>
      </div>

      <div className="resultado-container">
        <h2>Resultado da Cotação</h2>
        <p>Aqui será exibido o resultado do cálculo.</p>
      </div>
    </div>
  );
};

export default Cotacao;
