# The Living Portfolio RPG

A playable top-down browser RPG built around Vijayarka Nanduri's portfolio. The portfolio is now the world: the Arcade, Archives, Library, Forge and Signal Tower are explorable locations with NPCs, dialogue, quests, XP, a minimap and a Codex for the deeper work.

## Controls

- **WASD / arrow keys:** move
- **Space:** talk, enter locations and advance dialogue
- **C:** open the Codex
- **Esc:** pause or close dialogue
- **Touch:** use the on-screen directional controls and diamond action button

## Run locally

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080` in a browser. No build command or backend is required.

## Publish

GitHub Pages can deploy directly from `main` and the repository root. Netlify can use the repository with an empty build command and `.` as the publish directory.

Live site: https://vijayarkananduri.github.io/Vijayarka-/

Progress is saved only in the visitor's browser using `localStorage`. The game includes procedural terrain, material textures, animated water and particles, character/NPC sprites, collision-aware movement, location discovery, quest rewards, dialogue, a day-night tint, a minimap and a portfolio Codex.
