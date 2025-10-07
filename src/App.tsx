import { useState } from 'react'
import { SoundProvider } from './contexts/SoundContext'
import { MusicProvider } from './contexts/MusicContext'
import Desktop from './components/Desktop/Desktop'
import BootSequence from './components/Layout/BootSequence'
import ParticleSystem from './components/Effects/ParticleSystem'

function App() {
  const [showBoot, setShowBoot] = useState(true)

  const handleBootComplete = () => {
    setShowBoot(false)
  }

  return (
    <SoundProvider>
      <MusicProvider>
        {showBoot && <BootSequence onComplete={handleBootComplete} />}
        {!showBoot && <Desktop />}
        {/* Particle Effects - Always Active */}
        <ParticleSystem />
      </MusicProvider>
    </SoundProvider>
  )
}

export default App
