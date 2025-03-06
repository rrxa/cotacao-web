import React, { useState } from "react";
import "../assets/css/Cotacao.css";

const Cotacao = () => {
  const [form, setForm] = useState({
    cepOrigem: "74672856",
    cepDestino: "",
    valorNotaFiscal: "R$ 0,00",
    entregaDomicilio: false,
    retiraTerminal: false,
    pagamentoOrigem: false,
    pagamentoDestino: false,
    adValorem: false,
    semSeguro: false,
    volumes: [{ altura: 10, largura: 10, comprimento: 10, peso: 0 }],
  });

  // Manipular mudança de estado nos campos do formulário
  const formatCEP = (cep) => {
    let formattedCEP = cep.replace(/\D/g, "").slice(0, 8);
    return formattedCEP.length > 5
      ? formattedCEP.replace(/^(\d{5})(\d{3})$/, "$1-$2")
      : formattedCEP;
  };

  const formatCurrency = (value) => {
    let numericValue = value.replace(/\D/g, "");
    let floatValue = numericValue ? parseFloat(numericValue) / 100 : 0;
    return numericValue
      ? floatValue.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
        })
      : "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;
    if (name === "cepDestino") newValue = formatCEP(value);
    if (name === "valorNotaFiscal") newValue = formatCurrency(value);

    setForm((prevForm) => ({
      ...prevForm,
      [name]: newValue,
    }));
  };

  // Alternar entre Entrega a Domicílio e Retira no Terminal
  const handleEntregaClick = (tipo) => {
    if (tipo === "domicilio" && form.pagamentoDestino) {
      alert(
        "Não é possível selecionar Entrega a Domicílio quando o pagamento é no Destinatário."
      );
      return;
    }

    setForm((prevForm) => ({
      ...prevForm,
      entregaDomicilio:
        tipo === "domicilio" ? !prevForm.entregaDomicilio : false,
      retiraTerminal: tipo === "terminal" ? !prevForm.retiraTerminal : false,
    }));
  };

  // Regras de validação para Pagamento
  const validarPagamento = (tipo) => {
    if (tipo === "origem") {
      setForm((prevForm) => ({
        ...prevForm,
        pagamentoOrigem: true,
        pagamentoDestino: false,
      }));
    } else {
      if (form.entregaDomicilio) {
        alert(
          "Não é possível selecionar Pagamento no Destinatário quando Entrega a Domicílio está marcada."
        );
        return;
      }
      setForm((prevForm) => ({
        ...prevForm,
        pagamentoOrigem: false,
        pagamentoDestino: true,
      }));
    }
  };

  // Alternar entre Ad-Valorem e Sem Seguro
  const handleSeguroClick = (tipo) => {
    setForm((prevForm) => ({
      ...prevForm,
      adValorem: tipo === "adValorem" ? !prevForm.adValorem : false,
      semSeguro: tipo === "semSeguro" ? !prevForm.semSeguro : false,
    }));
  };

  // Alteraçoes em volumes
  const handleVolumeChange = (index, e) => {
    const { name, value } = e.target;

    if (name === "peso") {
      // Permite apagar tudo sem forçar um formato
      if (value === "") {
        const newVolumes = [...form.volumes];
        newVolumes[index][name] = "";
        setForm({ ...form, volumes: newVolumes });
        return;
      }

      // Permite apenas números e uma vírgula
      let pesoFormatado = value.replace(/[^0-9,]/g, "");

      // Garante que haja no máximo UMA vírgula
      const partes = pesoFormatado.split(",");
      if (partes.length > 2) {
        pesoFormatado = partes[0] + "," + partes.slice(1).join("");
      }

      const newVolumes = [...form.volumes];
      newVolumes[index][name] = pesoFormatado;
      setForm({ ...form, volumes: newVolumes });
      return;
    }

    const parsedValue = parseInt(value.replace(/\D/g, ""), 10);
    if (!isNaN(parsedValue)) {
      const newVolumes = [...form.volumes];
      newVolumes[index][name] = parsedValue;
      setForm({ ...form, volumes: newVolumes });
    }
  };

  const formatPesoFinal = (index) => {
    let pesoAtual = form.volumes[index].peso;

    // Permite que o usuário apague tudo sem adicionar zero automaticamente
    if (!pesoAtual || pesoAtual === "," || pesoAtual === "0,") {
      const newVolumes = [...form.volumes];
      newVolumes[index].peso = "";
      setForm({ ...form, volumes: newVolumes });
      return;
    }

    // Garante que o formato final seja X,X (uma casa decimal)
    let pesoNumerico = pesoAtual.replace(",", ".");
    let pesoFloat = parseFloat(pesoNumerico);

    if (!isNaN(pesoFloat)) {
      const formattedPeso = pesoFloat.toFixed(1).replace(".", ","); // Apenas 1 casa decimal
      const newVolumes = [...form.volumes];
      newVolumes[index].peso = formattedPeso;
      setForm({ ...form, volumes: newVolumes });
    }
  };

  // Adicionar novo volume
  const addVolume = () => {
    setForm((prevForm) => ({
      ...prevForm,
      volumes: [
        ...prevForm.volumes,
        { altura: 10, largura: 10, comprimento: 10, peso: 0 },
      ],
    }));
  };

  // Remover volume
  const removeVolume = (index) => {
    const newVolumes = form.volumes.filter((_, i) => i !== index);
    setForm({ ...form, volumes: newVolumes });
  };

  // Resetar o formulário
  const limparFormulario = () => {
    setForm({
      cepOrigem: "74672856",
      cepDestino: "",
      valorNotaFiscal: "R$ 0,00",
      entregaDomicilio: false,
      retiraTerminal: false,
      pagamentoOrigem: false,
      pagamentoDestino: false,
      adValorem: false,
      semSeguro: false,
      volumes: [{ altura: 10, largura: 10, comprimento: 10, peso: 0 }],
    });
  };

  // Simulação de cotação
  const calcularCotacao = () => {
    console.log("Cotação enviada:", form);
  };

  return (
    <div className="cotacao-container">
      <h1>Calculadora de Frete</h1>

      <div className="form-container">
        <div className="coluna-esquerda">
          <label>Origem:</label>
          <input type="text" value="GOIANIA-GO" disabled />

          <label>CEP de Destino:</label>
          <input
            type="text"
            name="cepDestino"
            value={form.cepDestino}
            onChange={handleChange}
            placeholder="Digite o CEP"
          />

          <label>Valor total dos Produtos:</label>
          <input
            type="text"
            name="valorNotaFiscal"
            value={form.valorNotaFiscal}
            onChange={handleChange}
          />

          {/* SEÇÃO PARA SEGURO - EVITANDO CONFLITO COM O CHECKBOX-GROUP PRINCIPAL */}
          <div className="checkbox-group seguro">
            <strong>Tipo de Seguro</strong>
            <div className="seguro-options">
              <button
                className={`option-button ${form.adValorem ? "active" : ""}`}
                onClick={() => handleSeguroClick("adValorem")}
              >
                Ad-Valorem
              </button>
              <button
                className={`option-button ${form.semSeguro ? "active" : ""}`}
                onClick={() => handleSeguroClick("semSeguro")}
              >
                Sem Seguro
              </button>
            </div>
          </div>
        </div>

        <div className="coluna-direita">
          <div className="checkbox-group">
            <strong>Entrega</strong>
            <button
              className={`option-button ${
                form.entregaDomicilio ? "active" : ""
              }`}
              onClick={() => handleEntregaClick("domicilio")}
            >
              Entrega a Domicílio
            </button>
            <button
              className={`option-button ${form.retiraTerminal ? "active" : ""}`}
              onClick={() => handleEntregaClick("terminal")}
            >
              Retira no Terminal de Cargas
            </button>
          </div>

          <div className="checkbox-group">
            <strong>Pagamento</strong>
            <button
              className={`payment-button ${
                form.pagamentoOrigem ? "active" : ""
              }`}
              onClick={() => validarPagamento("origem")}
            >
              Origem
            </button>
            <button
              className={`payment-button ${
                form.pagamentoDestino ? "active" : ""
              }`}
              onClick={() => validarPagamento("destino")}
            >
              Destinatário
            </button>
          </div>
        </div>
      </div>

      <div className="volumes-container">
        <h3>Dados do Volume</h3>
        {form.volumes.map((volume, index) => (
          <div key={index} className="volume-box">
            <label>Altura (cm)</label>
            <input
              type="number"
              name="altura"
              value={volume.altura}
              onChange={(e) => handleVolumeChange(index, e)}
            />

            <label>Largura (cm)</label>
            <input
              type="number"
              name="largura"
              value={volume.largura}
              onChange={(e) => handleVolumeChange(index, e)}
            />

            <label>Comprimento (cm)</label>
            <input
              type="number"
              name="comprimento"
              value={volume.comprimento}
              onChange={(e) => handleVolumeChange(index, e)}
            />

            <label>Peso (Kg)</label>
            <input
              type="text"
              name="peso"
              value={volume.peso}
              onChange={(e) => handleVolumeChange(index, e)}
              onBlur={() => formatPesoFinal(index)} // Formata ao sair do campo
            />

            {index > 0 && (
              <button
                className="delete-button"
                onClick={() => removeVolume(index)}
              >
                🗑️
              </button>
            )}
          </div>
        ))}
        <button className="add-button" onClick={addVolume}>
          + Adicionar Volume
        </button>
      </div>

      <div className="button-group">
        <button className="limpar-button" onClick={limparFormulario}>
          LIMPAR
        </button>
        <button className="calcular-button" onClick={calcularCotacao}>
          CALCULAR
        </button>
      </div>

      {/* SEÇÃO DE RESULTADO DA COTAÇÃO - SEM ALTERAÇÕES */}
      <div className="resultado-container">
        <h2>Resultado da Cotação</h2>
        {form.retiraTerminal && form.cepDestino ? (
          <p>
            O cliente deverá retirar a mercadoria no aeroporto correspondente ao
            destino informado.
          </p>
        ) : (
          <p>Aqui será exibido o resultado do cálculo.</p>
        )}
      </div>
    </div>
  );
};

export default Cotacao;
