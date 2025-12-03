FROM python:3.11-slim

WORKDIR /game

COPY font /game/font
COPY index.html /game/index.html
COPY game.js /game/game.js
COPY style.css /game/style.css

EXPOSE 8080

CMD ["python3", "-m", "http.server", "8080"]