from google import genai  # A NOVA biblioteca oficial
import os
import json
from fastapi import HTTPException


class AIBlogService:
    @staticmethod
    def generate_draft(raw_notes: str) -> dict:
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            print("DEBUG GENAI ERROR: GEMINI_API_KEY não encontrada no .env")
            raise HTTPException(
                status_code=500, detail="Chave de API não configurada.")

        client = genai.Client(api_key=api_key)

        prompt = f"""
        Aja como Pablo, estudante de ADS na Impacta e Tech Writer.
        Transforme as notas de estudo abaixo em um artigo técnico profissional.
        
        Notas: {raw_notes}
        
        REGRAS CRÍTICAS DE OUTPUT:
        1. Responda APENAS com um objeto JSON válido.
        2. O campo 'content' deve conter TODO o corpo do artigo formatado em Markdown rico (use ##, ###, blocos de código e negrito).
        3. Não crie campos como 'sections' ou 'introduction'. Tudo vai para o 'content'.
        
        ESTRUTURA OBRIGATÓRIA:
        {{
            "title": "Título do Artigo",
            "content": "Conteúdo completo em Markdown aqui...",
            "excerpt": "Resumo para SEO (160 caracteres)",
            "category": "ADS / Banco de Dados / Python",
            "read_time": "5 min",
            "slug": "url-amigavel-do-post"
        }}
        """
        try:
            response = client.models.generate_content(
                model='gemini-2.5-flash',
                contents=prompt,
                config={'response_mime_type': 'application/json'}
            )

            if not response.text:
                print("DEBUG GENAI ERROR: Resposta vazia (provável filtro de segurança)")
                raise HTTPException(
                    status_code=500, detail="A IA bloqueou este conteúdo.")

            return json.loads(response.text)

        except Exception as e:
            print(f"DEBUG GENAI CRITICAL ERROR: {str(e)}")
            raise HTTPException(
                status_code=500, detail="Erro interno na comunicação com a IA.")
