from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import portfolio
from app.routers import technologies
from app.routers import blog

app = FastAPI(
    title="Portfolio API",
    description="API Atomic e Profissional para o Portfólio",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(portfolio.router, prefix="/api/v1")
app.include_router(technologies.router, prefix="/api/v1")
app.include_router(blog.router, prefix="/api/v1")


@app.get("/")
def root():
    return {"message": "API do Portfólio Operacional. Acesse /docs para ver a documentação."}
