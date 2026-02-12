from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
import os
from datetime import timedelta
from jose import JWTError, jwt

from app.core.security import (
    create_access_token, 
    verify_password, 
    ACCESS_TOKEN_EXPIRE_MINUTES,
    SECRET_KEY,
    ALGORITHM
)

router = APIRouter(tags=["Authentication"])


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

class LoginSchema(BaseModel):
    username: str
    password: str

@router.post("/auth/login")
def login(credentials: LoginSchema):

    admin_user = os.getenv("ADMIN_USER") 
    admin_hash = os.getenv("ADMIN_PASSWORD_HASH")

    if not admin_hash:
        print("CRITICAL ERROR: ADMIN_PASSWORD_HASH não encontrado no .env")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
            detail="Erro interno de configuração de segurança."
        )
    
    target_user = admin_user if admin_user else "admin"
    
    if credentials.username != target_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Credenciais incorretas"
        )
    
    if not verify_password(credentials.password, admin_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, 
            detail="Credenciais incorretas"
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": target_user}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

async def get_current_user(token: str = Depends(oauth2_scheme)):

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Não foi possível validar as credenciais",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:

        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub") #type: ignore
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    return {"username": username}