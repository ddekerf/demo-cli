# Vibe Timer – Electron App Plan

## 1. Doel & scope
- Kleine desktop app om focus-sessies te starten/stoppen met een gekozen vibe (😴 / 🙂 / 🔥).
- Alles lokaal, geen accounts of backend.
- MVP: één venster, basic logging in een lijst.

## 2. Stack & tooling
- Electron (main + renderer process).
- HTML/CSS/vanilla JS voor UI in renderer.
- npm scripts: `start` (dev), later optioneel `build` (electron-builder).

## 3. Projectstructuur
- `/`  
  - `package.json` – metadata, dependencies, scripts.  
  - `main.js` – Electron main process, BrowserWindow maken, lifecycle.  
  - `index.html` – UI layout (select, knop, sessies-lijst).  
  - `renderer.js` – UI-logica en state in renderer.  
  - `assets/` (optioneel) – iconen, logo.

## 4. Functionele features (MVP)
- Vibe selecteren via dropdown (emoji + label).
- Start/stop-knop:
  - Bij start: starttijd bewaren, knop-staat en styling aanpassen.
  - Bij stop: eindtijd & duur berekenen, entry toevoegen aan lijst.
- Sessies-lijst:
  - Toon starttijd → eindtijd + duur + vibe.
  - Nieuwste sessie bovenaan.

## 5. UI & UX
- Donkere achtergrond; kaart-achtige container voor sessies.
- Duidelijke primaire knopkleur (groen voor start, rood voor stop).
- Compacte typografie (system-ui, 13–14px).
- Geen menubalk, fixed window size, niet resizable.

## 6. Electron-specifiek
- `main.js`:
  - `app.whenReady()` → `createWindow()` met `BrowserWindow`.
  - `loadFile('index.html')`.
  - `window-all-closed` → `app.quit()` (behalve macOS-conventie).
- `renderer.js`:
  - Geen Node-API’s nodig in MVP; puur DOM + tijdslogica.
  - Eventlisteners voor knop en DOMContentLoaded.

## 7. Security & best practices (lightweight)
- Renderer houdt alleen UI-logic; geen FS of OS calls.
- Indien later nodig: `preload.js` + context isolation + IPC.
- Minimale dependencies; geen extra frameworks in MVP. [web:34][web:42][web:47]

## 8. Roadmap uitbreidingen
- Status-indicator in titlebar (bijv. "Vibe Timer – 🔥 Running").
- Export naar JSON/CSV.
- Sessie-tags (projectnaam, task).
- Tray-icon + achtergrond-timer.
- Settings (default vibe, auto-focus duur).

## 9. Setup & run
- `npm init -y`
- `npm install electron --save-dev`
- `npm start` → `electron .` via script in `package.json`. [web:29][web:34]
