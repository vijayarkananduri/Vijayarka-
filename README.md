# The Living Portfolio RPG

A premium mobile-first 3D browser RPG for Vijayarka Nanduri. The portfolio is the world: the Arcade, Archives, Library, Forge and Signal Tower are explorable landmarks with NPCs, dialogue, quests, XP, an in-game Codex and touch-friendly movement.

## Controls

- **Tap the ground:** move toward that point
- **WASD / arrow keys:** move
- **Space:** talk, enter landmarks and advance dialogue
- **C:** open the Codex
- **Esc:** pause or close dialogue
- **Mobile:** use the on-screen joystick and diamond action button

## Run locally

Serve the repository from a web server because the game imports Three.js as an ES module:

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080` in a modern mobile or desktop browser.

## Publish

GitHub Pages can deploy directly from `main` and the repository root. Netlify can use the repository with an empty build command and `.` as the publish directory.

Live site: https://vijayarkananduri.github.io/Vijayarka-/

The game uses a lightweight low-poly 3D renderer with real-time lighting, shadows, fog, animated water, procedural ground texture, instanced forest props, glowing landmarks, sprite labels, tap-to-move, collision-safe bounds, responsive HUD and local progress persistence. Three.js is loaded from jsDelivr at runtime.
