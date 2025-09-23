# 🔊 Sound Files for Pixel Portfolio

## Required Sound Files

Place the following sound files in this directory:

### Basic Sound Effects
- `boot.mp3` - System boot sound (retro computer startup)
- `click.mp3` - UI click sound (short, crisp)
- `open.mp3` - Window/app opening sound
- `close.mp3` - Window/app closing sound
- `type.mp3` - Keyboard typing sound (short)
- `error.mp3` - Error notification sound
- `success.mp3` - Success notification sound

### Background Music
- `retro-adventure.mp3` - Boot sequence background music (synthwave/chiptune)
- `jazz-piano.mp3` - Desktop ambient music (lo-fi jazz piano)

## Sound Sources & Recommendations

### Free Sound Libraries
1. **Freesound.org** (free, requires account)
   - Search for: "8-bit", "chiptune", "retro", "pixel"
   - Download as .mp3 or .wav

2. **Zapsplat** (free for personal use)
   - High-quality UI sounds
   - Retro computer sounds

3. **OpenGameArt.org**
   - Game-ready sound effects
   - 8-bit style sounds

### Specific Recommendations

#### Boot Sound
- Search: "computer startup", "retro boot", "8-bit power on"
- Duration: 2-3 seconds
- Style: Classic computer startup chime

#### Click Sounds
- Search: "button click", "UI click", "pixel click"
- Duration: 0.1-0.2 seconds
- Style: Sharp, satisfying click

#### Type Sound
- Search: "keyboard type", "mechanical keyboard", "typewriter"
- Duration: 0.05-0.1 seconds
- Style: Subtle typing sound

#### Background Music
- **Retro Adventure**: Synthwave, chiptune, or 80s electronic
- **Jazz Piano**: Lo-fi hip hop, ambient jazz, cafe music
- Duration: 2-3 minutes (will loop)
- Volume: Keep moderate (0.3-0.4 volume)

## Audio Format & Specifications

- **Format**: MP3 (best browser compatibility)
- **Quality**: 128-192 kbps (good balance of quality/size)
- **File Size**: Keep under 1MB each for fast loading
- **Length**:
  - Sound effects: 0.1-3 seconds
  - Music: 2-3 minutes (loops automatically)

## Quick Setup with AI

You can also use AI tools to generate sounds:
1. **ElevenLabs** - Voice and sound generation
2. **Mubert** - AI music generation
3. **Jukebox** - OpenAI's music generation

## Testing

Once files are added, test the sound system:
1. Start the development server
2. Check browser console for sound loading errors
3. Use the sound controls in the bottom-right corner
4. Test all interactions (clicking icons, opening windows, typing)

## Volume Levels (Recommended)

```typescript
boot: 0.7,
click: 0.5,
open: 0.6,
close: 0.6,
type: 0.3,
error: 0.8,
success: 0.7,
bootMusic: 0.4,
desktopMusic: 0.3
```

## Fallback Behavior

The sound system is designed to work gracefully without sound files:
- Missing sounds won't break the application
- Console warnings will indicate missing files
- All functionality remains intact without audio