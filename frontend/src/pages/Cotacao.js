import React from "react";

function Cotacao() {
    return (
        <div className="container">
            <h2>Cotação</h2>
            <div className="form-group">
                <label>Origem:</label>
                <input type="text" value="Goiânia-GO" disabled />
            </div>

            <div className="form-group">
                <label>Destino:</label>
                <input type="text" id="cep-destino" placeholder="Digite o CEP" />
            </div>

            <div className="form-group">
                <label>Valor da Nota Fiscal:</label>
                <input type="number" placeholder="Digite o valor" />
            </div>

            <h3>Dados do Volume</h3>
            <div className="form-group">
                <input type="number" placeholder="Altura (cm)" />
                <input type="number" placeholder="Largura (cm)" />
                <input type="number" placeholder="Comprimento (cm)" />
                <input type="number" placeholder="Peso (kg)" />
            </div>

            <div className="form-buttons">
                <button id="adicionar-volume">Adicionar volume</button>
                <button>Calcular</button>
            </div>
        </div>
    );
}

export default Cotacao;
