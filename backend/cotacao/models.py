from django.db import models
from decimal import Decimal

# 📌 Modelo para armazenar os códigos IATA
class Iata(models.Model):
    codigo = models.CharField(max_length=3, unique=True)  # Código IATA único

    def __str__(self):
        return self.codigo

# 📌 Modelo para armazenar as cidades disponíveis
class Cidade(models.Model):
    nome = models.CharField(max_length=100)
    uf = models.CharField(max_length=2)
    iata = models.ForeignKey(Iata, on_delete=models.CASCADE, related_name="cidades")  # Vinculado ao IATA
    tipo = models.CharField(max_length=20, choices=[('DIRETO', 'Direto'), ('ST', 'Serviço Terceirizado')])
    st_codigo = models.CharField(max_length=10, null=True, blank=True)  # campo ST
    prazo_base = models.IntegerField(default=0)  # Prazo base do local
    prazo_adicional = models.IntegerField(default=0)  # Prazo adicional se ST
    observacoes = models.TextField(blank=True, null=True)
    
    def calcular_prazo_final(self):
        return self.prazo_base + self.prazo_adicional if self.tipo == 'ST' else self.prazo_base

    def __str__(self):
        return f"{self.nome} - {self.uf} ({self.iata})"

# 📌 Modelo para armazenar os tipos de serviço disponíveis
class Servico(models.Model):
    nome = models.CharField(max_length=50, unique=True, choices=[
        ('standard', 'Standard'),
        ('e_facil', 'E-Fácil'),
        ('veloz', 'Veloz'),
    ])
    descricao = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nome

# 📌 Modelo de Tarifas para Standard (Vinculado a Cidade)
class TarifaStandard(models.Model):
    cidade = models.ForeignKey(Cidade, on_delete=models.CASCADE, related_name="tarifas_standard")
    origem = models.ForeignKey(Cidade, related_name="origem_tarifa", on_delete=models.CASCADE, null=True, blank=True)
    servico = models.ForeignKey(Servico, on_delete=models.CASCADE)
    tarifa_ate_5kg = models.DecimalField(max_digits=10, decimal_places=2)
    tarifa_por_kg_adicional = models.DecimalField(max_digits=10, decimal_places=2)
    prazo = models.IntegerField()

    def __str__(self):
        return f"{self.origem} -> {self.cidade} ({self.servico})"
class TarifaST(models.Model):
    codigo = models.CharField(max_length=10, unique=True)
    tarifa_ate_5kg = models.DecimalField(max_digits=10, decimal_places=2)
    tarifa_por_kg_adicional = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.codigo} - {self.tarifa_ate_5kg} / {self.tarifa_por_kg_adicional}"

# 📌 Modelo de Tarifas para E-Fácil e Veloz (Vinculado ao IATA)
class TarifaRaio(models.Model):
    iata = models.ForeignKey("Iata", on_delete=models.CASCADE, null=True, blank=True)
    servico = models.ForeignKey("Servico", on_delete=models.CASCADE)
    raio = models.IntegerField()  # Número do raio (1, 2, 3, ..., 48)
    peso = models.DecimalField(max_digits=5, decimal_places=2)  # Peso informado pelo usuário
    valor_base = models.DecimalField(max_digits=10, decimal_places=2)  # Valor usado para peso até 30kg
    valor_fixo = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)  # 🔹 Novo campo para cálculo acima de 30kg
    valor_calculado = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    def calcular_valor(self):
        """
        🔹 Lógica baseada na planilha:
        - Se o peso for até 30kg, usa `valor_base`
        - Se o peso for maior que 30kg, usa `valor_fixo` * peso
        """
        if self.peso > 30 and self.valor_fixo is not None:
            return self.valor_fixo * self.peso
        return self.valor_base if self.peso <= 30 else Decimal(0)

    def save(self, *args, **kwargs):
        self.valor_calculado = self.calcular_valor()  # Sempre calcula antes de salvar
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.iata} - Raio {self.raio} - {self.peso}kg - R${self.valor_calculado}"

# 📌 Modelo de Parâmetro para armazenar regras de cotação
class Parametro(models.Model):
    coleta_desc = models.CharField(max_length=255)
    entrega_desc = models.CharField(max_length=255)
    origem = models.ForeignKey(Cidade, on_delete=models.CASCADE, related_name="parametros_origem")
    destino = models.ForeignKey(Cidade, on_delete=models.CASCADE, related_name="parametros_destino")
    servico = models.ForeignKey(Servico, on_delete=models.CASCADE, related_name="parametros")
    prazo = models.IntegerField()
    valor = models.DecimalField(max_digits=10, decimal_places=2)

    def calcular_prazo(self):
        return self.destino.calcular_prazo_final()

    def __str__(self):
        return f"{self.origem} -> {self.destino} [{self.servico}] (R${self.valor})"

# 📌 Modelo de Cotação para armazenar os cálculos feitos
from django.db import models
from decimal import Decimal

# 📌 Modelo de Cotação para armazenar os cálculos feitos
class Cotacao(models.Model):
    origem = models.ForeignKey(Cidade, on_delete=models.CASCADE, related_name="cotacoes_origem")
    destino = models.ForeignKey(Cidade, on_delete=models.CASCADE, related_name="cotacoes_destino")
    servico = models.ForeignKey(Servico, on_delete=models.CASCADE, related_name="cotacoes")
    peso = models.DecimalField(max_digits=10, decimal_places=2)
    tarifa = models.DecimalField(max_digits=10, decimal_places=2)
    desconto = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)
    valor_final = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)

    def calcular_valor_final(self):
        try:
            valor_total = Decimal(0)  # Inicializa a variável corretamente

            if self.servico.nome in ["e_facil", "veloz"]:
                if self.destino and self.destino.iata:
                    tarifa_obj = TarifaRaio.objects.filter(
                        iata=self.destino.iata,
                        servico=self.servico,
                        peso__gte=self.peso
                    ).order_by('peso').first()

                    if tarifa_obj:
                        valor_total = tarifa_obj.valor

            elif self.servico.nome == "standard":
                tarifa_obj = TarifaStandard.objects.filter(
                    cidade=self.destino,
                    servico=self.servico
                ).first()

                if tarifa_obj:
                    if self.peso <= 5:
                        valor_total = tarifa_obj.tarifa_ate_5kg
                    else:
                        valor_total = tarifa_obj.tarifa_ate_5kg + ((self.peso - 5) * tarifa_obj.tarifa_por_kg_adicional)

            # Converter desconto para Decimal antes da multiplicação
            desconto = Decimal(self.desconto) / Decimal(100)
            valor_final = valor_total * (Decimal(1) - desconto)

            return round(valor_final, 2)  # Retorna o valor final arredondado para 2 casas decimais

        except Exception as e:
            print(f"❌ Erro ao calcular cotação: {e}")
            return Decimal(0)

    def save(self, *args, **kwargs):
        self.valor_final = self.calcular_valor_final()  # Atualiza antes de salvar
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.origem} -> {self.destino} ({self.servico}) (R${self.valor_final})"
