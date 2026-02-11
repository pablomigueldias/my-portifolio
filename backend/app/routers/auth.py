from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
import os
from datetime import timedelta
from app.core.security import create_access_token, verify_password, ACCESS_TOKEN_EXPIRE_MINUTES

router = APIRouter(tags=["Authentication"])

class LoginSchema(BaseModel):
    username: str
    password: str

@router.post("/auth/login")
def login(credentials: LoginSchema):

    admin_user = os.getenv("ADMIN_USER", "admin") 
    
    admin_hash = os.getenv("ADMIN_PASSWORD_HASH")

    if not admin_hash:
        print("CRITICAL ERROR: ADMIN_PASSWORD_HASH não encontrado no .env")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
            detail="Erro interno de configuração de segurança."
        )
    
    if credentials.username != admin_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Credenciais incorretas"
        )
    
    if not verify_password(credentials.password, admin_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Credenciais incorretas"
        )
    
    # 5. Gera Token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": admin_user}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}