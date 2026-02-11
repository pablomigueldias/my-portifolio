from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from app.core.limiter import limiter

from app.routers import portfolio, technologies, blog, contact, auth
from app.db.database import engine
from app.models.base import Base
from app.models import portfolio as models_portfolio
from app.models import resume as models_resume
from app.models import blog as models_blog
from app.models import contact as models_contact

app = FastAPI(
    title="Portfolio API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url=None
)

app.state.limiter = limiter
app.add_exception_handler(
    RateLimitExceeded, _rate_limit_exceeded_handler)  # type: ignore

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://my-portifolio-754e.onrender.com",
        "https://my-portifolio-sandy-one.vercel.app",
        "https://pabloortiz.dev",
        "https://www.pabloortiz.dev"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(portfolio.router)
app.include_router(technologies.router)
app.include_router(blog.router)
app.include_router(contact.router)
app.include_router(auth.router)


@app.get("/", tags=["Healthcheck"])
def root():
    return {"status": "online"}


if __name__ == "__main__":
    import uvicorn
    Base.metadata.create_all(bind=engine)
    uvicorn.run(app, host="0.0.0.0", port=8000)
