from django.db import models

# Modelo para armazenar os códigos IATA (para serem compartilhados por várias cidades)
class Iata(models.Model):
    codigo = models.CharField(max_length=3, unique=True)  # Código IATA único

    def __str__(self):
        return self.codigo

# Modelo para armazenar as cidades disponíveis
class Cidade(models.Model):
    nome = models.CharField(max_length=100)
    uf = models.CharField(max_length=2)
    iata = models.ForeignKey(Iata, on_delete=models.CASCADE)  # Agora faz referência à tabela IATA
    tipo = models.CharField(max_length=20, choices=[('DIRETO', 'Direto'), ('ST', 'Serviço Terceirizado')])
    prazo_base = models.IntegerField(default=0)  # Prazo base do local
    prazo_adicional = models.IntegerField(default=0)  # Prazo adicional se ST
    observacoes = models.TextField(blank=True, null=True)  # Observações adicionais

    def calcular_prazo_final(self):
        return self.prazo_base + self.prazo_adicional if self.tipo == 'ST' else self.prazo_base

    def __str__(self):
        return f"{self.nome} - {self.uf} ({self.iata})"

# Modelo para armazenar os tipos de serviço disponíveis
class Servico(models.Model):
    nome = models.CharField(max_length=50, unique=True, choices=[
        ('standard', 'Standard'),
        ('e_facil', 'E-Fácil'),
        ('veloz', 'Veloz'),
    ])
    descricao = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nome  # Correção do retorno

# Modelo para armazenar tarifas diferentes para cada cidade e serviço
class Tarifa(models.Model):
    cidade = models.ForeignKey("Cidade", on_delete=models.CASCADE)  # Destino
    origem = models.ForeignKey("Cidade", related_name="origem_tarifa", on_delete=models.CASCADE, null=True, blank=True)  # Origem
    servico = models.ForeignKey("Servico", on_delete=models.CASCADE)  
    tarifa_ate_5kg = models.DecimalField(max_digits=10, decimal_places=2)
    tarifa_por_kg_adicional = models.DecimalField(max_digits=10, decimal_places=2)
    prazo = models.IntegerField()
    raio = models.IntegerField(null=True, blank=True)  # Usado apenas para o serviço E-Fácil

    def __str__(self):
        return f"{self.origem} -> {self.cidade} ({self.servico})"

# Parâmetros de cotação (define regras de origem/destino/serviço)
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

# Modelo de Cotação para armazenar os cálculos feitos
class Cotacao(models.Model):
    origem = models.ForeignKey(Cidade, on_delete=models.CASCADE, related_name="cotacoes_origem")
    destino = models.ForeignKey(Cidade, on_delete=models.CASCADE, related_name="cotacoes_destino")
    servico = models.ForeignKey(Servico, on_delete=models.CASCADE, related_name="cotacoes")
    peso = models.DecimalField(max_digits=10, decimal_places=2)
    tarifa = models.DecimalField(max_digits=10, decimal_places=2)
    desconto = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)
    valor_final = models.DecimalField(max_digits=10, decimal_places=2)

    def calcular_valor_final(self):
        try:
            tarifa_obj = self.destino.tarifas.get(servico=self.servico)
            tarifa_base = tarifa_obj.tarifa_ate_5kg
            tarifa_adicional = 0

            if self.peso > 5:
                tarifa_adicional = (self.peso - 5) * tarifa_obj.tarifa_por_kg_adicional

            valor_total = tarifa_base + tarifa_adicional
            return valor_total * (1 - (self.desconto / 100))
        except Tarifa.DoesNotExist:
            return 0  # Retorna 0 caso não encontre uma tarifa correspondente

    def save(self, *args, **kwargs):
        self.valor_final = self.calcular_valor_final()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.origem} -> {self.destino} ({self.servico}) (R${self.valor_final})"
