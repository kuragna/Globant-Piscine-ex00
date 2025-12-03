FROM python:3.11-slim

WORKDIR /games
COPY game /game

EXPOSE 8080

CMD ["python3", "-m", "http.server", "8080"]