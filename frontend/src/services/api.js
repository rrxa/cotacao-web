import axios from "axios";

const API_URL = "http://localhost:8000/api"; // Ajuste conforme o backend

export const enviarCotacao = async (dados) => {
  try {
    const resposta = await axios.post(`${API_URL}/cotacao/`, dados);
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao enviar cotação:", erro);
    return null;
  }
};

export const buscarCidades = async () => {
  try {
    const resposta = await axios.get(`${API_URL}/cidades/`);
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao buscar cidades:", erro);
    return [];
  }
};
