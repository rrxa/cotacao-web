from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Parametro, Cidade, Cotacao, TarifaStandard, TarifaST
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
    Se houver mais de uma cidade com o mesmo IATA, escolhe a cidade principal (DIRETO).
    """
    cidade = Cidade.objects.filter(iata__codigo=iata.upper()).order_by('-tipo').first()
    
    if not cidade:
        return Response({"erro": "Cidade não encontrada."}, status=404)

    serializer = CidadeSerializer(cidade)
    return Response(serializer.data)

@api_view(['POST'])
def calcular_cotacao(request):
    """
    Calcula a cotação com base nos dados fornecidos e retorna mensagens conforme a lógica da planilha.
    Espera-se um JSON com 'origem', 'destino' e 'peso'.
    """
    origem_iata = request.data.get("origem")
    destino_iata = request.data.get("destino")
    peso = float(request.data.get("peso", 0))  # Garantindo que peso é um número válido

    origem = get_object_or_404(Cidade, iata__codigo=origem_iata.upper())

    destino = Cidade.objects.filter(iata__codigo=destino_iata.upper()).order_by('-tipo').first()
    if not destino:
        return Response({"erro": "Destino não encontrado."}, status=404)

    # Se for ST, buscar a tarifa na cidade correspondente ao mesmo IATA
    if destino.tipo == "ST":
        cidade_base = Cidade.objects.filter(iata=destino.iata, tipo="DIRETO").first()
        if not cidade_base:
            return Response({"erro": "Tarifa para cidade ST não encontrada."}, status=400)
        tarifa = TarifaST.objects.filter(iata=cidade_base.iata).first()
    else:
        tarifa = TarifaStandard.objects.filter(iata=destino.iata).first()

    if not tarifa:
        return Response({"erro": "Tarifa não encontrada para o destino selecionado."}, status=400)

    mensagens = []  # Lista para armazenar mensagens da cotação

    # 🚀 **Mensagem 1: Carga com valor acima de 300 mil**
    if peso * tarifa.tarifa_ate_5kg > 300000:
        mensagens.append("Carga Valor (Acima de 300 mil/emissão): Cliente deverá optar pelo Seguro Próprio ou pelo transporte Sem Seguro e a regra abaixo se mantém.")

    # 🚀 **Mensagem 2: Carga com valor acima de 20 mil por kg**
    if tarifa.tarifa_ate_5kg > 20000:
        mensagens.append("Carga Valor (Acima de 20 mil por kg): Aceite apenas nos serviços VELOZ e RESERVADO, de Segunda a Quinta, sem opção de Coleta/Entrega e/ou Surface.")

    # 🚀 **Mensagem 3: Entrega em domicílio suspensa**
    if destino.tipo == "ST" and destino.prazo_adicional > 3:
        mensagens.append(f"Entrega em domicílio temporariamente suspensa. É possível retirar em {destino.nome} ({destino.iata.codigo}).")

    # 🚀 **Mensagem 4: Cidade sem loja LATAM**
    if not destino.iata:
        cidade_proxima = Cidade.objects.filter(tipo="DIRETO").first()
        if cidade_proxima:
            mensagens.append(f"Esta cidade não possui loja LATAM. A mais próxima para retirar é {cidade_proxima.nome} ({cidade_proxima.iata.codigo}).")

    # 🚀 **Mensagem 5: Serviço Frap não permitido**
    if destino.tipo == "ST":
        mensagens.append("Não é possível enviar Frap no(s) serviço(s) grifado(s). Consulte as condições.")

    # 🚀 **Mensagem 6: Destino ST – Não aceita pagamento a cobrar**
    if destino.tipo == "ST":
        mensagens.append("Destino ST: Não é possível enviar a cobrar. O pagamento deverá ser feito na origem.")

    # 🚀 **Mensagem 7: Necessidade de carro dedicado**
    if peso > 100:
        mensagens.append("Esta carga necessita de carro dedicado, e portanto será necessário contatar seu executivo local para calcular taxas de coleta/entrega, que divergem das apresentadas abaixo.")

    # 🚀 **Mensagem 8: Prazo reduzido para cargas grandes**
    if destino.tipo == "ST" and destino.prazo_base < 4 and peso > 30:
        mensagens.append("Prazo reduzido para essa cidade, consulte viabilidade para volumes acima de 30kg.")

    # 🚀 **Mensagem 9: Restrições para remessas ST acima de 50kg**
    if origem.tipo == "ST" and peso > 50:
        mensagens.append("Remessa proveniente de destino ST com mais de 50kg pode ter restrições. Consulte previamente.")

    # Criar cotação
    cotacao = Cotacao(
        origem=origem,
        destino=destino,
        peso=peso,
        tarifa=tarifa.tarifa_ate_5kg,  # Ajustar conforme necessário
        desconto=0  # Se precisar de desconto, pode ser ajustado aqui
    )
    cotacao.valor_final = cotacao.calcular_valor_final()

    serializer = CotacaoSerializer(cotacao)

    return Response({
        "cotacao": serializer.data,
        "mensagens": mensagens  # ✅ Retornando todas as mensagens identificadas
    })
