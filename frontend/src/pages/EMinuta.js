import React from "react";
import "../assets/css/EMinuta.css";

const EMinuta = () => {
  const eMinutaURL = "https://www.latamcargo.com/pt/eminutaclient";

  return (
    <div className="eminuta-container">
      <h1>Instruções para Preenchimento da E-Minuta</h1>
      <div className="eminuta-content">
        <p>
          Prezados clientes, ao realizar embarque de cargas conosco, é de
          extrema importância que tragam a <strong>E-Minuta preenchida</strong>.
          Para isso, siga o passo a passo abaixo:
        </p>

        <ol>
          <li>
            Acesse o site:{" "}
            <a
              href="https://www.latamcargo.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.latamcargo.com
            </a>
          </li>
          <li>
            Clique na aba <strong>E-Services</strong> e depois em{" "}
            <strong>E-Minuta</strong>.
          </li>
          <li>
            O site irá direcionar para a página da{" "}
            <strong>MINUTA ELETRÔNICA</strong>. Clique na bandeira do Brasil.
          </li>
          <li>Preencha as informações solicitadas no formulário.</li>
          <li>
            Se não possuir dados existentes, clique em <strong>Pular</strong> e
            insira as informações manualmente.
          </li>
        </ol>

        <p>
          <strong>Importante:</strong> O preenchimento antecipado da E-Minuta{" "}
          <strong>facilita os processos</strong> e{" "}
          <strong>reduz o tempo de espera</strong>.
        </p>

        <div className="eminuta-button-container">
          <button
            className="eminuta-button"
            onClick={() => window.open(eMinutaURL, "_blank")}
          >
            Acessar E-Minuta
          </button>
        </div>
      </div>
    </div>
  );
};

export default EMinuta;
