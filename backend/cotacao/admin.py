from django.contrib import admin
from .models import Cidade, Servico, TarifaStandard, TarifaRaio, Parametro, Cotacao, Iata, TarifaST

# 🔹 Registro do modelo Iata com pesquisa habilitada
@admin.register(Iata)
class IataAdmin(admin.ModelAdmin):
    list_display = ["codigo"]
    search_fields = ["codigo"]  # 🔥 Permite busca no Django Admin

# 🔹 Registro do modelo Cidade para permitir autocomplete
@admin.register(Cidade)
class CidadeAdmin(admin.ModelAdmin):
    list_display = ["nome", "uf", "iata"]
    search_fields = ["nome", "uf", "iata__codigo"]  # 🔥 Busca cidades pelo nome, UF e código IATA

# 🔹 Registro de TarifaStandard com filtros e autocomplete
@admin.register(TarifaStandard)
class TarifaStandardAdmin(admin.ModelAdmin):
    list_display = ("cidade", "origem", "servico", "tarifa_ate_5kg", "tarifa_por_kg_adicional", "prazo")
    list_filter = ("servico", "cidade", "origem")
    search_fields = ["cidade__nome", "origem__nome", "servico__nome"]  # 🔥 Busca pelo nome da cidade e serviço
    autocomplete_fields = ["cidade", "origem"]  # 🔥 Habilita autocomplete nos campos cidade e origem

# 🔹 Registro de TarifaRaio com campos corrigidos e readonly para o valor calculado
@admin.register(TarifaRaio)
class TarifaRaioAdmin(admin.ModelAdmin):
    list_display = ("iata", "servico", "raio", "peso", "valor_base", "valor_fixo", "valor_calculado")  
    list_filter = ("iata", "servico")
    search_fields = ["iata__codigo", "servico__nome"]  
    autocomplete_fields = ["iata"]
    readonly_fields = ("valor_calculado",)  # 🔥 O valor calculado será gerado automaticamente
    
# 🔹 Registro de TarifaST com ordenação e busca habilitada
@admin.register(TarifaST)
class TarifaSTAdmin(admin.ModelAdmin):
    list_display = ("codigo", "tarifa_ate_5kg", "tarifa_por_kg_adicional")
    search_fields = ("codigo",)
    ordering = ("codigo",)

# 🔹 Registro dos demais modelos sem redundância
admin.site.register(Servico)
admin.site.register(Parametro)
admin.site.register(Cotacao)
