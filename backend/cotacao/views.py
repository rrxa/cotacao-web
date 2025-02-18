import json
import unicodedata
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def calcular_cotacao(request):
    if request.method == "POST":
        try:
            # 🔹 Decodifica corretamente o JSON garantindo UTF-8
            raw_data = request.body.decode("utf-8", errors="replace")
            data = json.loads(raw_data)

            # 🔹 Normaliza caracteres acentuados corretamente
            def normalize(text):
                if isinstance(text, str):
                    return unicodedata.normalize("NFKC", text)
                return text

            origem = normalize(data.get("origem", "").strip())
            destino = normalize(data.get("destino", "").strip())
            peso = data.get("peso")

            # 🔹 Verifica se os campos obrigatórios estão presentes
            if not origem or not destino or not peso:
                return JsonResponse({"erro": "Dados incompletos"}, status=400)

            # 🔹 Simula o cálculo do preço
            resultado = {
                "origem": origem,
                "destino": destino,
                "preco": float(peso) * 10  # Exemplo de cálculo
            }

            # 🔹 Retorna JSON garantindo UTF-8 e preservando caracteres especiais
            return JsonResponse(resultado, json_dumps_params={'ensure_ascii': False})

        except UnicodeDecodeError:
            return JsonResponse({"erro": "Erro de codificação. Certifique-se de que os dados estão em UTF-8."}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({"erro": "Erro ao processar JSON"}, status=400)
        except Exception as e:
            return JsonResponse({"erro": str(e)}, status=500)

    return JsonResponse({"erro": "Método não permitido"}, status=405)
