import pandas as pd
import django
import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "cotacao.settings")
django.setup()

from cotacao.models import Cidade, Parametro

# 🔍 Carregar planilha
file_path = "Cotacao_LATAM_Desbloqueada.xlsx"
df = pd.read_excel(file_path, sheet_name=None)

def limpar_e_validar(valor):
    """
    Converte valores vazios para zero e garante formato numérico.
    """
    if pd.isna(valor):
        return 0.00
    try:
        return float(valor)
    except ValueError:
        return 0.00

def importar_parametros(sheet_name):
    """
    Importa dados da aba especificada na planilha.
    """
    if sheet_name not in df:
        print(f"❌ Aba {sheet_name} não encontrada!")
        return

    dados = df[sheet_name]

    for _, row in dados.iterrows():
        iata = str(row.get("IATA", "")).strip().upper()
        cidade = Cidade.objects.filter(iata=iata).first()

        if not cidade:
            print(f"⚠️ Cidade com sigla '{iata}' não encontrada.")
            continue

        # Criar ou atualizar parâmetros
        Parametro.objects.update_or_create(
            destino=cidade,
            defaults={
                "tarifa_minima": limpar_e_validar(row.get("Tarifa Mínima")),
                "tarifa": limpar_e_validar(row.get("Tarifa")),
                "coleta_desc": limpar_e_validar(row.get("Coleta Desc")),
                "entrega_desc": limpar_e_validar(row.get("Entrega Desc")),
            },
        )

    print(f"✅ Importação concluída para {sheet_name}!")

# 🔥 Executar importação para todas as abas relevantes
abas_para_importar = ["EFA", "VLZ", "LATAM"]
for aba in abas_para_importar:
    importar_parametros(aba)
