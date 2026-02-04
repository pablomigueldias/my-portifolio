from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import portfolio, technologies, blog

app = FastAPI(
    title="Portfolio API",
    description="API Atomic e Profissional para o Portfólio",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://my-portifolio-754e.onrender.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(portfolio.router, prefix="/api/v1")
app.include_router(technologies.router, prefix="/api/v1")
app.include_router(blog.router, prefix="/api/v1")

@app.get("/", tags=["Healthcheck"])
def root():
    return {"status": "online", "version": "1.0.0"}