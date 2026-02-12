from google import genai
from google.genai import types
import os
import json
from fastapi import HTTPException, UploadFile

# Configuração Centralizada
def get_client():
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("DEBUG GENAI ERROR: GEMINI_API_KEY não encontrada no .env")
        raise HTTPException(status_code=500, detail="Chave de API não configurada.")
    return genai.Client(api_key=api_key)

# 1. Função para Texto (Notas)
def generate_blog_post(raw_notes: str) -> dict:
    client = get_client()

    prompt = f"""
    Aja como Pablo, estudante de ADS na Impacta, Full Stack Developer e Tech Writer.
    Transforme as notas de estudo abaixo em um artigo técnico profissional para o meu blog pessoal.
    
    Notas: {raw_notes}
    
    REGRAS CRÍTICAS DE OUTPUT:
    1. Responda APENAS com um objeto JSON válido. Sem markdown ```json em volta.
    2. O campo 'content' deve conter TODO o corpo do artigo formatado em Markdown rico (use ##, ###, blocos de código e negrito).
    3. O tom deve ser didático, profissional, mas acessível (nível Junior/Pleno).
    4. Crie um slug (URL) amigável baseada no título.
    
    ESTRUTURA JSON OBRIGATÓRIA:
    {{
        "title": "Título Instigante do Artigo",
        "content": "Conteúdo completo em Markdown aqui...",
        "excerpt": "Resumo curto para SEO (máx 160 caracteres)",
        "category": "Escolha a melhor: Python / JavaScript / DevOps / Carreira / Dados",
        "slug": "url-amigavel-do-post",
        "read_time": "X min"
    }}
    """
    
    try:
        response = client.models.generate_content(
            model='gemini-2.0-flash', # Usando a versão mais estável/rápida atual
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type='application/json'
            )
        )

        if not response.text:
            raise HTTPException(status_code=500, detail="A IA retornou vazio.")

        return json.loads(response.text)

    except Exception as e:
        print(f"DEBUG GENAI ERROR: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Erro na IA: {str(e)}")

# 2. Função para Arquivos (PDF/TXT)
async def generate_from_file(file: UploadFile) -> dict:
    client = get_client()
    
    # Lê o conteúdo do arquivo
    content_bytes = await file.read()
    
    # Se for texto/md/py/js, decodifica. Se for PDF, precisaria de libs extras, 
    # mas vamos assumir texto simples para simplificar ou usar o Gemini Vision se fosse imagem.
    try:
        text_content = content_bytes.decode('utf-8')
    except:
        # Fallback simples caso não seja UTF-8
        text_content = str(content_bytes)

    prompt = f"""
    Analise o conteúdo do arquivo técnico abaixo e crie um artigo de blog sobre ele.
    Siga as mesmas regras de formatação JSON e estilo do Pablo (Estudante ADS/Dev).
    
    Conteúdo do Arquivo:
    {text_content[:30000]} # Limitando caracteres para não estourar token simples
    """

    try:
        response = client.models.generate_content(
            model='gemini-2.0-flash',
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type='application/json'
            )
        )
        return json.loads(response.text) #type: ignore
    except Exception as e:
        print(f"DEBUG FILE GENAI ERROR: {str(e)}")
        raise HTTPException(status_code=500, detail="Erro ao processar arquivo pela IA.")