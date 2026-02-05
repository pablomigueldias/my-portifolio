from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import os

security = HTTPBearer()

MASTER_KEY = os.getenv("ADMIN_API_KEY")

def validate_admin(credentials: HTTPAuthorizationCredentials = Depends(security)):
    if not MASTER_KEY or credentials.credentials != MASTER_KEY:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Acesso restrito ao administrador.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return credentials.credentials