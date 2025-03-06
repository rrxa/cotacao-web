from django.urls import path
from .views import listar_parametros, detalhes_cidade, calcular_cotacao

urlpatterns = [
    path('parametros/', listar_parametros, name="listar_parametros"),
    path('cidade/<str:iata>/', detalhes_cidade, name="detalhes_cidade"),
    path('calcular-cotacao/', calcular_cotacao, name="calcular_cotacao"),
]
