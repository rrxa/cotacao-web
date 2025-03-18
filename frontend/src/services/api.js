const API_URL = "http://127.0.0.1:8000";

export const calcularCotacao = async (dados) => {
  try {
    const response = await fetch(`${API_URL}/calcular/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(dados),
    });

    if (!response.ok) {
      throw new Error("Erro ao calcular cotação");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro na requisição:", error);
    return { erro: "Falha ao conectar com o servidor" };
  }
};
