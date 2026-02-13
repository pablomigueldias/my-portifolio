FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 
ENV PYTHONUNBUFFERED=1 

ENV TZ=America/Sao_Paulo

WORKDIR /app

RUN apt-get update && apt-get install -y tzdata \
    && ln -fs /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime \
    && dpkg-reconfigure -f noninteractive tzdata

RUN pip install --no-cache-dir poetry

COPY pyproject.toml poetry.lock* /app/

RUN poetry config virtualenvs.create false \
    && poetry install --only main --no-interaction --no-ansi --no-root

COPY . /app

CMD ["sh", "-c", "alembic upgrade head && uvicorn app.main:app --host 0.0.0.0 --port 8000"]