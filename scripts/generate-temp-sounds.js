// Temporary Sound Generator for Testing
// Run this script to create basic beep sounds for testing the sound system

const fs = require('fs');
const path = require('path');

const soundsDir = path.join(__dirname, '..', 'public', 'sounds');

// Create sounds directory if it doesn't exist
if (!fs.existsSync(soundsDir)) {
  fs.mkdirSync(soundsDir, { recursive: true });
}

console.log('🔊 Generating temporary sound files for testing...');

// Simple Web Audio API sound generation (for testing only)
const generateWebAudioHTML = () => `
<!DOCTYPE html>
<html>
<head>
    <title>Sound Generator</title>
</head>
<body>
    <h1>Pixel Portfolio Sound Generator</h1>
    <p>Use this page to generate and download basic sound effects for testing.</p>

    <button onclick="generateSound('boot', 800, 0.5, 'sine')">Generate Boot Sound</button>
    <button onclick="generateSound('click', 100, 0.3, 'square')">Generate Click Sound</button>
    <button onclick="generateSound('open', 300, 0.4, 'triangle')">Generate Open Sound</button>
    <button onclick="generateSound('close', 200, 0.4, 'triangle')">Generate Close Sound</button>
    <button onclick="generateSound('type', 50, 0.2, 'square')">Generate Type Sound</button>
    <button onclick="generateSound('error', 400, 0.6, 'sawtooth')">Generate Error Sound</button>
    <button onclick="generateSound('success', 600, 0.5, 'sine')">Generate Success Sound</button>

    <script>
    function generateSound(name, frequency, duration, waveType = 'sine') {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();

        // Create oscillator
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = waveType;

        // Envelope
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);

        // Record audio (simplified - use Web Audio API recorder in real implementation)
        console.log(\`Generated \${name} sound: \${frequency}Hz, \${duration}s, \${waveType}\`);
        alert(\`\${name} sound played! In a real implementation, this would be recorded and saved as an MP3 file.\`);
    }

    // Instructions
    document.body.innerHTML += \`
        <hr>
        <h2>Instructions:</h2>
        <ol>
            <li>Click the buttons above to test different sound frequencies</li>
            <li>Use a sound recorder or browser extension to capture the audio</li>
            <li>Save as MP3 files with the corresponding names</li>
            <li>Place in the /public/sounds/ directory</li>
        </ol>

        <h3>Better Alternatives:</h3>
        <ul>
            <li><strong>Freesound.org</strong> - Download real retro sound effects</li>
            <li><strong>Audacity</strong> - Generate and edit sounds manually</li>
            <li><strong>Online tone generators</strong> - Create specific frequencies</li>
        </ul>

        <h3>Quick Music Sources:</h3>
        <ul>
            <li><strong>YouTube Audio Library</strong> - Free background music</li>
            <li><strong>Kevin MacLeod</strong> - Royalty-free music</li>
            <li><strong>Chiptune.com</strong> - 8-bit style music</li>
        </ul>
    \`;
    </script>
</body>
</html>
`;

// Write the HTML sound generator
const generatorPath = path.join(soundsDir, 'sound-generator.html');
fs.writeFileSync(generatorPath, generateWebAudioHTML());

console.log('✅ Created sound generator at:', generatorPath);
console.log('🌐 Open this HTML file in your browser to generate test sounds');

// Create placeholder files to prevent 404 errors
const placeholderSounds = [
  'boot.mp3',
  'click.mp3',
  'open.mp3',
  'close.mp3',
  'type.mp3',
  'error.mp3',
  'success.mp3',
  'retro-adventure.mp3',
  'jazz-piano.mp3'
];

placeholderSounds.forEach(soundFile => {
  const filePath = path.join(soundsDir, soundFile);
  if (!fs.existsSync(filePath)) {
    // Create empty file to prevent 404 errors
    fs.writeFileSync(filePath, '');
    console.log(`📝 Created placeholder: ${soundFile}`);
  }
});

console.log('\n🎵 Sound system setup complete!');
console.log('📁 Directory:', soundsDir);
console.log('🔧 Next steps:');
console.log('  1. Replace placeholder files with actual audio');
console.log('  2. Open sound-generator.html for testing');
console.log('  3. Visit freesound.org for high-quality sound effects');
console.log('  4. Check the README.md for detailed instructions');