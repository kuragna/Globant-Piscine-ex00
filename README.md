# 2048
a single-player sliding puzzle game where the goal is to slide numbered tiles on a 4x4 grid to combine them and create a tile with the number 2048
## Quick Start
```console
$ git clone https://github.com/kuragna/Globant-Piscine-ex00.git
$ docker compose -f ./docker-compose.yaml up
```
## Gameplay
2048 is played on a **4×4 grid**. Each turn, you can slide all tiles **up, down, left, or right**. When two tiles with the same number collide, they merge into one tile with double the value `(2 + 2 = 4, 4 + 4 = 8)`.

After every move:
- A new tile (2 or 4) spawns in an empty cell.
- The game continues until you either create the 2048 tile (you win!) or the grid fills up and no more moves are possible (game over).
## Controls
- ↑ Move tiles up
- ↓ Move tiles down
- ← Move tiles left
- → Move tiles right