from fastapi import FastAPI,Depends
from fastapi.middleware.cors import CORSMiddleware
from app.core.security import validate_admin
from app.routers import portfolio, technologies, blog

app = FastAPI(
    title="Portfolio API",
    description="API Atomic e Profissional para o Portfólio",
    docs_url="/admin-docs",
    redoc_url=None,
    version="1.0.0",
    redirect_slashes=False 
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://my-portifolio-754e.onrender.com",
        "https://my-portifolio-sandy-one.vercel.app",
        "https://pabloortiz.dev"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(portfolio.router, dependencies=[Depends(validate_admin)])
app.include_router(technologies.router, dependencies=[Depends(validate_admin)])
app.include_router(blog.router, dependencies=[Depends(validate_admin)])

@app.get("/", tags=["Healthcheck"])
def root():
    return {"status": "online", "version": "1.0.0"}