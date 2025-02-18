import React, { useEffect, useState } from "react";
import { buscarCidades } from "../services/api";

function Resultados() {
  const [cidades, setCidades] = useState([]);

  useEffect(() => {
    async function carregarDados() {
      const listaCidades = await buscarCidades();
      setCidades(listaCidades);
    }
    carregarDados();
  }, []);

  return (
    <div>
      <h1>Histórico de Cotações</h1>
      {cidades.length > 0 ? (
        <ul>
          {cidades.map((cidade) => (
            <li key={cidade.id}>{cidade.nome}</li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma cotação registrada ainda.</p>
      )}
    </div>
  );
}

export default Resultados;
