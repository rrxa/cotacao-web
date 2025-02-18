import axios from 'axios';

const API_BASE_URL = "http://localhost:8000/api"; // URL do backend Django

/**
 * Busca o nome da cidade e estado a partir do CEP digitado.
 */
export const buscarCidadePorCep = async (cep) => {
    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (response.data.erro) throw new Error("CEP não encontrado");
        
        return `${response.data.localidade}-${response.data.uf}`;
    } catch (error) {
        console.error("Erro ao buscar cidade:", error);
        return null;
    }
};

/**
 * Envia os dados do formulário de cotação para o backend e retorna o resultado.
 */
export const calcularCotacao = async (dadosCotacao) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/cotacao/`, dadosCotacao);
        return response.data;
    } catch (error) {
        console.error("Erro ao calcular cotação:", error);
        return null;
    }
};
