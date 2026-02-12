import google.generativeai as genai
import os
import json
from fastapi import HTTPException, UploadFile


def configure_genai():
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("DEBUG GENAI ERROR: GEMINI_API_KEY não encontrada no .env")
        raise HTTPException(
            status_code=500, detail="Chave de API não configurada.")
    genai.configure(api_key=api_key)  # type: ignore


def generate_blog_post(raw_notes: str) -> dict:
    configure_genai()

    model = genai.GenerativeModel('gemini-pro')  # type: ignore

    prompt = f"""
    Aja como Pablo, estudante de ADS na Impacta, Full Stack Developer e Tech Writer.
    Transforme as notas de estudo abaixo em um artigo técnico profissional para o meu blog pessoal.
    
    Notas: {raw_notes}
    
    REGRAS CRÍTICAS DE OUTPUT:
    1. Responda APENAS com um objeto JSON válido.
    2. O campo 'content' deve conter TODO o corpo do artigo formatado em Markdown rico.
    3. Crie um slug (URL) amigável baseada no título.
    
    ESTRUTURA JSON OBRIGATÓRIA:
    {{
        "title": "Título Instigante",
        "content": "Conteúdo em Markdown...",
        "excerpt": "Resumo curto (SEO)",
        "category": "Categoria Tech",
        "slug": "url-do-post",
        "read_time": "5 min"
    }}
    """

    try:
        response = model.generate_content(prompt)

        if not response.text:
            raise HTTPException(status_code=500, detail="A IA retornou vazio.")

        return json.loads(response.text)

    except Exception as e:
        print(f"DEBUG GENAI ERROR: {str(e)}")
        error_msg = str(e)
        raise HTTPException(status_code=500, detail=f"Erro na IA: {error_msg}")


async def generate_from_file(file: UploadFile) -> dict:
    configure_genai()

    model = genai.GenerativeModel(  # type: ignore
        'gemini-1.5-flash',
        generation_config={"response_mime_type": "application/json"}
    )

    content_bytes = await file.read()

    try:
        text_content = content_bytes.decode('utf-8')
    except:
        text_content = str(content_bytes)

    prompt = f"""
    Analise o conteúdo do arquivo técnico abaixo e crie um artigo de blog sobre ele.
    Siga as mesmas regras de formatação JSON e estilo do Pablo.
    
    Conteúdo:
    {text_content[:30000]} 
    """

    try:
        response = model.generate_content(prompt)
        return json.loads(response.text)
    except Exception as e:
        print(f"DEBUG FILE GENAI ERROR: {str(e)}")
        raise HTTPException(
            status_code=500, detail="Erro ao processar arquivo.")
