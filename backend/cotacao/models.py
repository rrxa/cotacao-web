from django.db import models

class Cidade(models.Model):
    nome = models.CharField(max_length=100)
    uf = models.CharField(max_length=2)
    iata = models.CharField(max_length=3, unique=True)  # Evita repetição de IATA
    tipo = models.CharField(max_length=20)
    st = models.CharField(max_length=10)
    prazo = models.IntegerField()

    def __str__(self):
        return f"{self.nome} - {self.uf}"

class Parametro(models.Model):
    destino = models.ForeignKey(Cidade, on_delete=models.CASCADE, related_name="parametros")
    tarifa_minima = models.DecimalField(max_digits=10, decimal_places=2)
    tarifa = models.DecimalField(max_digits=10, decimal_places=2)
    coleta_desc = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True, default=0)
    entrega_desc = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True, default=0)

    def __str__(self):
        return f"{self.destino} - Tarifa: {self.tarifa}"

class Cotacao(models.Model):
    origem = models.ForeignKey(Cidade, on_delete=models.CASCADE, related_name='origens')
    destino = models.ForeignKey(Cidade, on_delete=models.CASCADE, related_name='destinos')
    peso = models.DecimalField(max_digits=10, decimal_places=2)
    tarifa = models.DecimalField(max_digits=10, decimal_places=2)
    desconto = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)
    valor_final = models.DecimalField(max_digits=10, decimal_places=2)

    def calcular_valor_final(self):
        return max(self.tarifa * self.peso, self.tarifa_minima) * (1 - (self.desconto / 100))

    def save(self, *args, **kwargs):
        self.valor_final = self.calcular_valor_final()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.origem} -> {self.destino} ({self.valor_final})"
