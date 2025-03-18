from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),  # Painel administrativo do Django
    path('api/', include('cotacao.urls')),  # Inclui as rotas do app cotacao
]
