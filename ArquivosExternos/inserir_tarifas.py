from cotacao.models import Cidade, Servico, Tarifa
from decimal import Decimal

# Definir a origem como Goiânia - GO (GYN)
origem = Cidade.objects.get(nome="Goiânia", uf="GO")

# Lista de tarifas extraída da planilha
tarifas = [
    {"cidade": "Rio Branco", "uf": "AC", "iata": "RBR", "servico": "standard", "tarifa_ate_5kg": 40.00, "tarifa_por_kg": 5.50, "prazo": 5},
    {"cidade": "Porto de Pedras", "uf": "AL", "iata": "MCZ", "servico": "standard", "tarifa_ate_5kg": 35.00, "tarifa_por_kg": 3.50, "prazo": 3},
    {"cidade": "Jacuípe", "uf": "AL", "iata": "MCZ", "servico": "standard", "tarifa_ate_5kg": 30.00, "tarifa_por_kg": 3.00, "prazo": 2},
    {"cidade": "Flexeiras", "uf": "AL", "iata": "MCZ", "servico": "standard", "tarifa_ate_5kg": 32.00, "tarifa_por_kg": 3.20, "prazo": 3},

    # Serviços E-Fácil
    {"cidade": "Rio Branco", "uf": "AC", "iata": "RBR", "servico": "e_facil", "tarifa_ate_5kg": 45.00, "tarifa_por_kg": 6.00, "prazo": 6},
    {"cidade": "Porto de Pedras", "uf": "AL", "iata": "MCZ", "servico": "e_facil", "tarifa_ate_5kg": 38.00, "tarifa_por_kg": 4.00, "prazo": 4},
    
    # Serviços Veloz
    {"cidade": "Rio Branco", "uf": "AC", "iata": "RBR", "servico": "veloz", "tarifa_ate_5kg": 50.00, "tarifa_por_kg": 7.00, "prazo": 4},
    {"cidade": "Porto de Pedras", "uf": "AL", "iata": "MCZ", "servico": "veloz", "tarifa_ate_5kg": 40.00, "tarifa_por_kg": 5.00, "prazo": 3},
]

# Inserindo as tarifas no banco de dados
for tarifa in tarifas:
    try:
        cidade_destino = Cidade.objects.get(nome=tarifa["cidade"], uf=tarifa["uf"])
        servico = Servico.objects.get(nome=tarifa["servico"])

        Tarifa.objects.create(
            cidade=cidade_destino,
            origem=origem,
            servico=servico,
            tarifa_ate_5kg=Decimal(tarifa["tarifa_ate_5kg"]),
            tarifa_por_kg_adicional=Decimal(tarifa["tarifa_por_kg"]),
            prazo=tarifa["prazo"]
        )

        print(f"Tarifa para {cidade_destino} ({servico}) inserida com sucesso!")
    except Cidade.DoesNotExist:
        print(f"Erro: Cidade {tarifa['cidade']} - {tarifa['uf']} não encontrada!")
    except Servico.DoesNotExist:
        print(f"Erro: Serviço {tarifa['servico']} não encontrado!")

print("Todas as tarifas foram inseridas com sucesso!")
