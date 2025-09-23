# 🎵 Music Files für Vinyl Player

## Dateistruktur

Platziere deine Lo-Fi Jazz Tracks hier:

```
/public/music/
├── bittersweet.mp3      ✅ (dein Track)
├── midnight-cafe.mp3    📁 (oder andere Namen)
├── rainy-window.mp3     📁 (anpassen nach deinen Dateien)
└── coffee-dreams.mp3    📁 (etc.)
```

## Features des Music Players

### 🎵 **Vinyl Record Animation**
- Rotiert beim Abspielen
- Schallplatten-Design mit Rillen
- Tonarm bewegt sich automatisch

### ⏰ **Auto-Start (10 Sekunden)**
- Startet automatisch nach 10 Sekunden
- Beginnt mit dem ersten Track (bittersweet.mp3)
- Kann abgebrochen werden

### 🎛️ **Steuerung**
- ▶️ Play/Pause
- ⏮️ Previous Track
- ⏭️ Next Track
- 🔊 Volume Control (0-100%)
- 📊 Progress Bar (Suchfunktion)

### 📀 **Playlist**
- Alle Tracks anzeigen/verstecken
- Click auf Track = sofort abspielen
- Auto-Loop: Nach letztem Track → erster Track
- Aktueller Track hervorgehoben

### 🔊 **Sound Integration**
- Click-Sounds bei allen Buttons
- Error-Sound bei Problemen
- Success-Sound bei Track-Wechsel

## Anpassung an deine Tracks

Bearbeite die PLAYLIST in:
`src/components/MusicPlayer/VinylMusicPlayer.tsx`

```typescript
const PLAYLIST: Track[] = [
  {
    id: 'dein-track-1',
    name: 'Dein Track Name',
    file: '/music/dein-dateiname.mp3',
    artist: 'Dein Artist',
    duration: '3:24'
  },
  // weitere Tracks...
]
```

## Unterstützte Formate
- MP3 (empfohlen)
- WAV
- OGG

## Optimale Einstellungen
- Bitrate: 128-192 kbps
- Länge: 2-5 Minuten
- Dateigröße: < 10MB pro Track
- Volume: Wird automatisch auf 60% gestartet