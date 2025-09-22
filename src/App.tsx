import { useState } from 'react'
import Desktop from './components/Desktop/Desktop'
import BootSequence from './components/Layout/BootSequence'

function App() {
  const [showBoot, setShowBoot] = useState(true)

  const handleBootComplete = () => {
    setShowBoot(false)
  }

  return (
    <>
      {showBoot && <BootSequence onComplete={handleBootComplete} />}
      {!showBoot && <Desktop />}
    </>
  )
}

export default App
