from cotacao.models import Cidade

# Criar um dicionário para rastrear cidades únicas
cidades_unicas = {}
duplicatas = []

# Percorrer todas as cidades do banco de dados
for cidade in Cidade.objects.all():
    chave = (cidade.nome.strip().lower(), cidade.uf.strip().lower())  # Normalizar para evitar problemas de formatação

    if chave in cidades_unicas:
        duplicatas.append(cidade.id)  # Se já existir, adiciona aos IDs das duplicatas
    else:
        cidades_unicas[chave] = cidade.id  # Mantém o primeiro registro encontrado

# Se houver duplicatas, excluí-las
if duplicatas:
    Cidade.objects.filter(id__in=duplicatas).delete()
    print(f"Removidas {len(duplicatas)} cidades duplicadas.")
else:
    print("Nenhuma duplicata encontrada. O banco já está limpo.")
