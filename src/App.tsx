import { useState } from 'react'
import { SoundProvider } from './contexts/SoundContext'
import { MusicProvider } from './contexts/MusicContext'
import Desktop from './components/Desktop/Desktop'
import BootSequence from './components/Layout/BootSequence'

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
      </MusicProvider>
    </SoundProvider>
  )
}

export default App
