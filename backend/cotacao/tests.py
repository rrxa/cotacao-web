from django.test import TestCase
from .models import Parametro, Cidade, Cotacao

class ParametroTestCase(TestCase):
    def setUp(self):
        self.cidade = Cidade.objects.create(
            nome="São Paulo", uf="SP", iata="GRU", tipo="Aeroporto", st="Nacional", prazo=2
        )
        self.parametro = Parametro.objects.create(
            destino=self.cidade,
            tarifa_minima=30.00,
            tarifa=50.00,
            coleta_desc=5.00,
            entrega_desc=5.00
        )

    def test_parametro_criado(self):
        parametro = Parametro.objects.first()
        self.assertEqual(parametro.tarifa, 50.00)

class CotacaoTestCase(TestCase):
    def setUp(self):
        self.origem = Cidade.objects.create(
            nome="Rio de Janeiro", uf="RJ", iata="GIG", tipo="Aeroporto", st="Nacional", prazo=3
        )
        self.destino = Cidade.objects.create(
            nome="São Paulo", uf="SP", iata="GRU", tipo="Aeroporto", st="Nacional", prazo=2
        )
        self.parametro = Parametro.objects.create(
            destino=self.destino,
            tarifa_minima=30.00,
            tarifa=50.00,
            coleta_desc=5.00,
            entrega_desc=5.00
        )

    def test_calculo_cotacao(self):
        cotacao = Cotacao(
            origem=self.origem,
            destino=self.destino,
            peso=10.0,
            tarifa=self.parametro.tarifa,
            desconto=0
        )
        cotacao.valor_final = cotacao.calcular_valor_final()
        self.assertEqual(cotacao.valor_final, 500.00)  # 50.00 * 10kg
