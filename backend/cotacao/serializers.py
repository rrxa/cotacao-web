from rest_framework import serializers
from .models import Parametro, Cidade, Cotacao

class ParametroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parametro
        fields = '__all__'

class CidadeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cidade
        fields = '__all__'

class CotacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cotacao
        fields = '__all__'
