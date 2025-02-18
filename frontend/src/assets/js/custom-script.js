document.addEventListener("DOMContentLoaded", function () {
    console.log("Script de interações carregado!");

    // Fixar CEP de origem como Goiânia-GO
    const cepOrigem = document.getElementById("cep-origem");
    if (cepOrigem) {
        cepOrigem.value = "Goiânia-GO";
        cepOrigem.disabled = true;
    }

    // Buscar cidade e estado pelo CEP de destino
    const cepDestino = document.getElementById("cep-destino");
    if (cepDestino) {
        cepDestino.addEventListener("blur", function () {
            let cep = this.value.replace(/\D/g, "");
            if (cep.length === 8) {
                fetch(`https://viacep.com.br/ws/${cep}/json/`)
                    .then(response => response.json())
                    .then(data => {
                        if (!data.erro) {
                            this.value = `${data.localidade}-${data.uf}`;
                        } else {
                            alert("CEP inválido. Tente novamente.");
                            this.value = "";
                        }
                    })
                    .catch(error => console.error("Erro ao buscar CEP:", error));
            }
        });
    }

    // Adicionar e remover volumes dinamicamente
    const btnAdicionar = document.getElementById("adicionar-volume");
    const containerVolumes = document.getElementById("dados-volume");

    if (btnAdicionar && containerVolumes) {
        btnAdicionar.addEventListener("click", function () {
            let novoVolume = document.createElement("div");
            novoVolume.className = "volume-item";
            novoVolume.innerHTML = `
                <input type="number" placeholder="Altura (cm)" class="altura">
                <input type="number" placeholder="Largura (cm)" class="largura">
                <input type="number" placeholder="Comprimento (cm)" class="comprimento">
                <input type="number" placeholder="Peso (kg)" class="peso">
                <button class="remover-volume">🗑</button>
            `;
            containerVolumes.appendChild(novoVolume);

            novoVolume.querySelector(".remover-volume").addEventListener("click", function () {
                containerVolumes.removeChild(novoVolume);
            });
        });
    }
});
