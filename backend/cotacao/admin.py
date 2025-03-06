from django.contrib import admin
from .models import Cidade, Servico, Tarifa, Parametro, Cotacao

@admin.register(Tarifa)
class TarifaAdmin(admin.ModelAdmin):
    list_display = ("origem", "cidade", "servico", "tarifa_ate_5kg", "tarifa_por_kg_adicional", "prazo", "raio")
    list_filter = ("servico", "cidade", "origem")
    search_fields = ("cidade__nome", "origem__nome", "servico__nome")

admin.site.register(Cidade)
admin.site.register(Servico)
admin.site.register(Parametro)
admin.site.register(Cotacao)
