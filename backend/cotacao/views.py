from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Parametro, Cidade, Cotacao
from .serializers import ParametroSerializer, CidadeSerializer, CotacaoSerializer

@api_view(['GET'])
def listar_parametros(request):
    """
    Retorna uma lista de parâmetros cadastrados no banco de dados.
    """
    parametros = Parametro.objects.all()
    serializer = ParametroSerializer(parametros, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def detalhes_cidade(request, iata):
    """
    Retorna os detalhes de uma cidade pelo código IATA.
    """
    cidade = get_object_or_404(Cidade, iata=iata.upper())
    serializer = CidadeSerializer(cidade)
    return Response(serializer.data)

@api_view(['POST'])
def calcular_cotacao(request):
    """
    Calcula a cotação com base nos dados fornecidos.
    Espera-se um JSON com 'origem', 'destino' e 'peso'.
    """
    origem_iata = request.data.get("origem")
    destino_iata = request.data.get("destino")
    peso = request.data.get("peso")

    if not origem_iata or not destino_iata or not peso:
        return Response({"erro": "Campos obrigatórios: origem, destino, peso"}, status=400)

    origem = get_object_or_404(Cidade, iata=origem_iata.upper())
    destino = get_object_or_404(Cidade, iata=destino_iata.upper())

    parametro = Parametro.objects.filter(destino=destino).first()
    if not parametro:
        return Response({"erro": "Não há parâmetros cadastrados para essa cidade."}, status=400)

    cotacao = Cotacao(
        origem=origem,
        destino=destino,
        peso=peso,
        tarifa=parametro.tarifa,
        desconto=0  # Caso precise de lógica de desconto, adicionar aqui
    )
    cotacao.valor_final = cotacao.calcular_valor_final()

    serializer = CotacaoSerializer(cotacao)
    return Response(serializer.data)
