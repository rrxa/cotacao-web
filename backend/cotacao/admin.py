from django.contrib import admin
from .models import Cidade, Servico, TarifaStandard, TarifaRaio, Parametro, Cotacao, Iata, TarifaST

@admin.register(Iata)  # 🔥 Agora registrado para autocomplete
class IataAdmin(admin.ModelAdmin):
    list_display = ["codigo"]
    search_fields = ["codigo"]  # 🔥 Permite busca no Django Admin

@admin.register(Cidade)  # 🔥 Registrando Cidade para autocomplete funcionar
class CidadeAdmin(admin.ModelAdmin):
    list_display = ["nome", "uf", "iata"]
    search_fields = ["nome", "uf", "iata__codigo"]  # 🔥 Permite busca digitando

@admin.register(TarifaStandard)
class TarifaStandardAdmin(admin.ModelAdmin):
    list_display = ("cidade", "origem", "servico", "tarifa_ate_5kg", "tarifa_por_kg_adicional", "prazo")
    list_filter = ("servico", "cidade", "origem")
    search_fields = ["cidade__nome", "origem__nome", "servico__nome"]  # 🔥 Agora corretamente definido
    autocomplete_fields = ["cidade", "origem"]  # 🔥 Agora permite buscar cidades digitando

@admin.register(TarifaRaio)
class TarifaRaioAdmin(admin.ModelAdmin):
    list_display = ("iata", "servico", "raio", "peso", "valor")
    list_filter = ("iata", "servico")
    search_fields = ["iata__codigo", "servico__nome"]  # 🔥 Adicionado para corrigir erro
    autocomplete_fields = ["iata"]  # 🔥 Agora permite buscar por IATA digitando

@admin.register(TarifaST)
class TarifaSTAdmin(admin.ModelAdmin):
    list_display = ("codigo", "tarifa_ate_5kg", "tarifa_por_kg_adicional")
    search_fields = ("codigo",)
    ordering = ("codigo",)

admin.site.register(Servico)
admin.site.register(Parametro)
admin.site.register(Cotacao)
