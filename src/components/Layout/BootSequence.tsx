import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSoundContext } from '../../contexts/SoundContext'
import { useMusicContext } from '../../contexts/MusicContext'

interface BootSequenceProps {
  onComplete: () => void
}

type StageId = 'intro' | 'title' | 'prompt'

interface BootStage {
  id: StageId
  duration?: number
  autoAdvance: boolean
}

const PIXEL_FONT = '"Press Start 2P", "IBM Plex Mono", monospace'

const STAGE_FLOW: BootStage[] = [
  { id: 'intro', duration: 2800, autoAdvance: true },
  { id: 'title', duration: 4200, autoAdvance: true },
  { id: 'prompt', autoAdvance: false }
]

const BootSequence = ({ onComplete }: BootSequenceProps) => {
  const [stageIndex, setStageIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const { playSound, isLoaded } = useSoundContext()
  const { playTrack, playlist } = useMusicContext()

  const stage = STAGE_FLOW[stageIndex]?.id ?? 'prompt'

  useEffect(() => {
    const current = STAGE_FLOW[stageIndex]
    if (!current.autoAdvance || !current.duration) {
      return
    }

    const timeout = setTimeout(() => {
      setStageIndex(prev => Math.min(prev + 1, STAGE_FLOW.length - 1))
    }, current.duration)

    return () => clearTimeout(timeout)
  }, [stageIndex])

  // Play sound effects
  useEffect(() => {
    if (!isLoaded) return

    if (stage === 'title') {
      setTimeout(() => playSound('success'), 2000)
    }
  }, [stage, isLoaded, playSound])

  const handleComplete = useCallback(() => {
    // Start music on first user interaction
    if (playlist.length > 0) {
      playTrack(playlist[0])
    }
    setIsComplete(prev => (prev ? prev : true))
  }, [playlist, playTrack])

  useEffect(() => {
    if (stage !== 'prompt') {
      return
    }

    const handleClick = () => handleComplete()
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        handleComplete()
      }
    }

    window.addEventListener('click', handleClick)
    window.addEventListener('keydown', handleKey)

    return () => {
      window.removeEventListener('click', handleClick)
      window.removeEventListener('keydown', handleKey)
    }
  }, [stage, handleComplete])

  useEffect(() => {
    if (!isComplete) {
      return
    }

    const timeout = setTimeout(onComplete, 450)
    return () => clearTimeout(timeout)
  }, [isComplete, onComplete])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          key="boot-sequence"
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Black Background */}
          <div className="absolute inset-0 bg-black" />

          {/* Content */}
          <div className="relative z-10 flex h-screen w-screen items-center justify-center px-6 text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage}
                className="w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                {/* INTRO STAGE - Glitchy Lucky Cat Reveal */}
                {stage === 'intro' && (
                  <motion.div className="flex flex-col items-center justify-center gap-12 max-w-4xl mx-auto h-screen">
                    {/* Glitch Effect Container */}
                    <div className="relative">
                      {/* Background Glow */}
                      <motion.div
                        className="absolute inset-0 blur-3xl"
                        animate={{
                          background: [
                            'radial-gradient(circle, #FFD700 0%, transparent 70%)',
                            'radial-gradient(circle, #FF6347 0%, transparent 70%)',
                            'radial-gradient(circle, #FFD700 0%, transparent 70%)'
                          ]
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />

                      {/* Lucky Cat with Glitch */}
                      <motion.div
                        className="relative text-9xl"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          duration: 1.2,
                          ease: [0.34, 1.56, 0.64, 1]
                        }}
                      >
                        {/* Glitch Layers */}
                        <motion.div
                          className="absolute inset-0"
                          animate={{
                            x: [-2, 2, -2],
                            opacity: [0.5, 0.8, 0.5]
                          }}
                          transition={{
                            duration: 0.2,
                            repeat: Infinity,
                            repeatType: 'reverse'
                          }}
                          style={{
                            color: '#FF6347',
                            filter: 'blur(1px)'
                          }}
                        >
                          🐱
                        </motion.div>
                        <motion.div
                          className="absolute inset-0"
                          animate={{
                            x: [2, -2, 2],
                            opacity: [0.5, 0.8, 0.5]
                          }}
                          transition={{
                            duration: 0.2,
                            repeat: Infinity,
                            repeatType: 'reverse'
                          }}
                          style={{
                            color: '#FFD700',
                            filter: 'blur(1px)'
                          }}
                        >
                          🐱
                        </motion.div>

                        {/* Main Cat */}
                        <motion.div
                          animate={{
                            textShadow: [
                              '0 0 20px #FFD700, 0 0 40px #FF6347',
                              '0 0 40px #FF6347, 0 0 60px #FFD700',
                              '0 0 20px #FFD700, 0 0 40px #FF6347'
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          🐱
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Chinese Characters */}
                    <motion.div
                      className="text-4xl tracking-[0.5em]"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.8 }}
                      style={{
                        fontFamily: PIXEL_FONT,
                        background: 'linear-gradient(90deg, #FFD700 0%, #FF6347 50%, #FFD700 100%)',
                        backgroundSize: '200% 100%',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        animation: 'rainbow 3s linear infinite'
                      }}
                    >
                      招財進寶
                    </motion.div>

                    {/* Pulsing Dots */}
                    <motion.div
                      className="flex gap-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                    >
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-6 h-6"
                          style={{
                            background: i === 1 ? '#FF6347' : '#FFD700',
                            boxShadow: `0 0 20px ${i === 1 ? '#FF6347' : '#FFD700'}`,
                            borderRadius: '0'
                          }}
                          animate={{
                            scale: [1, 1.5, 1],
                            rotate: [0, 180, 360]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2
                          }}
                        />
                      ))}
                    </motion.div>

                    {/* Scanlines Effect */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-10"
                      style={{
                        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #FFD700 2px, #FFD700 4px)',
                        animation: 'scan 8s linear infinite'
                      }}
                    />
                  </motion.div>
                )}

                {/* TITLE STAGE - Lucky Cat */}
                {stage === 'title' && (
                  <motion.div className="flex flex-col items-center gap-16 max-w-4xl mx-auto">
                    {/* Lucky Cat Emoji with glow */}
                    <motion.div
                      className="text-8xl mb-8"
                      animate={{
                        textShadow: [
                          '0 0 20px #FFD700',
                          '0 0 60px #FFD700, 0 0 80px #FF6347',
                          '0 0 20px #FFD700'
                        ],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      🐱
                    </motion.div>

                    {/* Loading Text */}
                    <motion.span
                      className="text-xl tracking-[0.3em]"
                      style={{
                        fontFamily: PIXEL_FONT,
                        background: 'linear-gradient(45deg, #FFD700, #FF6347, #FFD700)',
                        backgroundSize: '200% 200%',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        animation: 'rainbow 3s ease infinite'
                      }}
                    >
                      LOADING LUCKY CAT
                    </motion.span>

                    {/* Lucky Cat Loading Animation */}
                    <motion.div className="flex flex-col items-center gap-6">
                      <div className="relative w-24 h-24">
                        {/* Lucky Cat Image - Smaller */}
                        <motion.img
                          src="/wallpapers/luckycat.png"
                          alt="Lucky Cat"
                          className="w-full h-full object-contain"
                          style={{
                            filter: 'drop-shadow(0 0 15px rgba(255, 215, 0, 0.6))'
                          }}
                          animate={{
                            scale: [1, 1.1, 1],
                            rotate: [-5, 5, -5]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'easeInOut'
                          }}
                        />

                        {/* Spinning coins around Lucky Cat - Smaller radius */}
                        {[0, 1, 2, 3, 4, 5].map((i) => (
                          <motion.div
                            key={i}
                            className="absolute text-xl"
                            style={{
                              top: '50%',
                              left: '50%',
                              transformOrigin: '0 0'
                            }}
                            animate={{
                              rotate: 360
                            }}
                            transition={{
                              duration: 2.5,
                              repeat: Infinity,
                              ease: 'linear',
                              delay: i * 0.15
                            }}
                          >
                            <motion.div
                              style={{
                                transform: `translate(-50%, -50%) translateX(50px) rotate(-${i * 60}deg)`,
                                textShadow: '0 0 10px rgba(255, 215, 0, 0.8)'
                              }}
                              animate={{
                                scale: [1, 1.2, 1]
                              }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                delay: i * 0.15
                              }}
                            >
                              {i % 2 === 0 ? '💰' : '💎'}
                            </motion.div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Loading text with dots */}
                      <motion.div
                        className="flex items-center gap-1 text-yellow-300"
                        style={{
                          fontFamily: PIXEL_FONT,
                          textShadow: '0 0 10px #FFD700'
                        }}
                      >
                        <span className="text-sm tracking-wider">招財進寶</span>
                        <motion.span
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        >
                          .
                        </motion.span>
                        <motion.span
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        >
                          .
                        </motion.span>
                        <motion.span
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        >
                          .
                        </motion.span>
                      </motion.div>
                    </motion.div>

                    {/* Progress bar - Gold/Red */}
                    <motion.div
                      className="w-80 h-2 border-2 border-yellow-400 relative bg-black/40"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      <motion.div
                        className="h-full bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-400"
                        style={{ boxShadow: '0 0 20px rgba(255, 215, 0, 0.6)' }}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 3, ease: 'easeInOut' }}
                      />
                    </motion.div>
                  </motion.div>
                )}

                {/* PROMPT STAGE - Lucky Cat Title */}
                {stage === 'prompt' && (
                  <motion.div className="flex flex-col items-center gap-12 max-w-4xl mx-auto">
                    <motion.h1
                      className="text-5xl sm:text-6xl lg:text-7xl mb-8"
                      style={{
                        fontFamily: PIXEL_FONT,
                        background: 'linear-gradient(45deg, #FFD700, #FF6347, #FFD700, #FF6347, #FFD700)',
                        backgroundSize: '400% 400%',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        animation: 'rainbow 4s ease infinite',
                        filter: 'drop-shadow(0 0 30px rgba(255, 215, 0, 0.8))'
                      }}
                    >
                      LUCKY CAT
                    </motion.h1>

                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <motion.div
                        className="text-2xl lg:text-3xl mb-6 tracking-[0.25em]"
                        style={{
                          fontFamily: PIXEL_FONT,
                          color: '#FFD700',
                          textShadow: '0 0 20px #FFD700, 0 0 40px #FF6347'
                        }}
                      >
                        招財進寶
                      </motion.div>
                      <motion.div
                        className="text-lg tracking-wider mb-12"
                        style={{
                          fontFamily: PIXEL_FONT,
                          color: '#FF6347',
                          textShadow: '0 0 10px #FF6347'
                        }}
                      >
                        TO THE MOON 🚀
                      </motion.div>

                      <motion.div
                        className="flex flex-wrap justify-center gap-3 text-xs uppercase tracking-[0.3rem] mb-16"
                        style={{
                          fontFamily: PIXEL_FONT,
                          color: '#FFD700',
                          textShadow: '0 0 8px #FFD700'
                        }}
                      >
                        <span>$LUCKY</span>
                        <span className="text-red-500">•</span>
                        <span>MEME COIN</span>
                        <span className="text-red-500">•</span>
                        <span>100X</span>
                        <span className="text-red-500">•</span>
                        <span>MOON</span>
                      </motion.div>
                    </motion.div>

                    <motion.div
                      className="flex items-center gap-6 text-xl px-8 py-4 border-2 border-yellow-400 bg-black/60"
                      style={{
                        fontFamily: PIXEL_FONT,
                        color: '#FFD700',
                        textShadow: '0 0 15px #FFD700',
                        boxShadow: '0 0 30px rgba(255, 215, 0, 0.5)'
                      }}
                      animate={{
                        opacity: [0.7, 1, 0.7],
                        scale: [0.98, 1.02, 0.98]
                      }}
                      transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    >
                      <span className="text-3xl">🐱</span>
                      <span className="tracking-widest">CLICK ANYWHERE TO START</span>
                      <span className="text-3xl">💰</span>
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default BootSequence
