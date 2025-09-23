import { createContext, useContext, ReactNode } from 'react'
import { useSound } from '../hooks/useSound'

interface SoundContextType {
  playSound: (soundName: string) => void
  stopSound: (soundName: string) => void
  playMusic: (musicName: 'bootMusic' | 'desktopMusic') => void
  stopMusic: () => void
  setVolume: (soundName: string, volume: number) => void
  setMasterVolume: (volume: number) => void
  isMuted: boolean
  toggleMute: () => void
  masterVolume: number
  isLoaded: boolean
  currentMusic: string | null
}

const SoundContext = createContext<SoundContextType | null>(null)

interface SoundProviderProps {
  children: ReactNode
}

export const SoundProvider = ({ children }: SoundProviderProps) => {
  const soundSystem = useSound()

  return (
    <SoundContext.Provider value={soundSystem}>
      {children}
    </SoundContext.Provider>
  )
}

export const useSoundContext = (): SoundContextType => {
  const context = useContext(SoundContext)
  if (!context) {
    throw new Error('useSoundContext must be used within a SoundProvider')
  }
  return context
}