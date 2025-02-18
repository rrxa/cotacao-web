from django.urls import path
from .views import calcular_cotacao

urlpatterns = [
    path('calcular/', calcular_cotacao, name='calcular_cotacao'),
]
