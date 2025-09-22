import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

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
  { id: 'intro', duration: 2600, autoAdvance: true },
  { id: 'title', duration: 4200, autoAdvance: true },
  { id: 'prompt', autoAdvance: false }
]

const BootSequence = ({ onComplete }: BootSequenceProps) => {
  const [stageIndex, setStageIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  const stage = STAGE_FLOW[stageIndex]?.id ?? 'prompt'

  const starField = useMemo(
    () =>
      Array.from({ length: 36 }, (_, index) => ({
        id: index,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2,
        delay: Math.random() * 2.5,
        duration: 2.5 + Math.random() * 2.2
      })),
    []
  )

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

  const handleComplete = useCallback(() => {
    setIsComplete(prev => (prev ? prev : true))
  }, [])

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
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at center, #001a2e 0%, #000811 50%, #000000 100%)'
            }}
          />
          <motion.div
            className="absolute inset-0 opacity-40"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(14,165,233,0.35) 0%, transparent 65%)'
            }}
            animate={{ opacity: [0.25, 0.45, 0.25], scale: [0.95, 1.05, 0.95] }}
            transition={{ repeat: Infinity, duration: 5.4, ease: 'easeInOut' }}
          />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'linear-gradient(rgba(59,130,246,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.15) 1px, transparent 1px)',
              backgroundSize: '70px 70px'
            }}
          />
          <div className="absolute inset-0 overflow-hidden">
            {starField.map(star => (
              <motion.span
                key={star.id}
                className="absolute rounded-full bg-cyan-100/80"
                style={{
                  top: `${star.top}%`,
                  left: `${star.left}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`
                }}
                animate={{ opacity: [0.12, 0.9, 0.12], scale: [0.85, 1.15, 0.85] }}
                transition={{
                  repeat: Infinity,
                  duration: star.duration,
                  delay: star.delay,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </div>
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, rgba(226,232,240,0.07) 0px, rgba(226,232,240,0.07) 1px, transparent 1px, transparent 4px)'
            }}
            animate={{ opacity: [0.05, 0.12, 0.05] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          />
          <div className="relative z-10 flex h-screen w-screen items-center justify-center px-6 text-center text-cyan-100">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage}
                className="w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                {stage === 'intro' && (
                  <motion.div className="flex flex-col items-center gap-12 max-w-4xl mx-auto">
                    <motion.div
                      className="text-6xl mb-8"
                      animate={{
                        textShadow: [
                          '0 0 20px #00ffff',
                          '0 0 40px #00ffff, 0 0 60px #00ffff',
                          '0 0 20px #00ffff'
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      🎮
                    </motion.div>
                    <motion.span
                      className="text-2xl sm:text-3xl tracking-[0.4em] text-cyan-300"
                      style={{
                        fontFamily: PIXEL_FONT,
                        textShadow: '0 0 20px #00ffff'
                      }}
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      PIXEL STUDIOS
                    </motion.span>
                    <motion.div
                      className="h-1 w-64 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                      animate={{ opacity: [0.4, 1, 0.4], scaleX: [0.8, 1, 0.8] }}
                      transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                    />
                    <motion.span
                      className="text-lg tracking-widest text-cyan-500"
                      style={{ fontFamily: PIXEL_FONT }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1, duration: 0.8 }}
                    >
                      PRESENTS
                    </motion.span>
                  </motion.div>
                )}

                {stage === 'title' && (
                  <motion.div className="flex flex-col items-center gap-8 max-w-4xl mx-auto">
                    <motion.span
                      className="text-xl tracking-[0.3em] text-cyan-300"
                      style={{
                        fontFamily: PIXEL_FONT,
                        textShadow: '0 0 15px #00ffff'
                      }}
                    >
                      LOADING PORTFOLIO
                    </motion.span>
                    <motion.h1
                      className="text-6xl sm:text-7xl lg:text-8xl"
                      style={{
                        fontFamily: PIXEL_FONT,
                        background: 'linear-gradient(45deg, #00ffff, #ff00ff, #ffff00, #00ff00, #00ffff)',
                        backgroundSize: '400% 400%',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        animation: 'rainbow 4s ease infinite',
                        filter: 'drop-shadow(0 0 30px rgba(0,255,255,0.8))'
                      }}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      EREN
                    </motion.h1>
                    <motion.div
                      className="w-96 h-2 border-2 border-cyan-400 relative bg-black/60"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <motion.div
                        className="h-full bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300"
                        style={{ boxShadow: '0 0 25px rgba(0,255,255,0.6)' }}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 3, ease: 'easeInOut' }}
                      />
                    </motion.div>
                  </motion.div>
                )}

                {stage === 'prompt' && (
                  <motion.div className="flex flex-col items-center gap-10 max-w-4xl mx-auto">
                    <motion.h1
                      className="text-5xl sm:text-6xl lg:text-7xl mb-8"
                      style={{
                        fontFamily: PIXEL_FONT,
                        background: 'linear-gradient(45deg, #00ffff, #ff00ff, #ffff00, #00ff00, #00ffff)',
                        backgroundSize: '400% 400%',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        animation: 'rainbow 4s ease infinite',
                        filter: 'drop-shadow(0 0 30px rgba(0,255,255,0.8))'
                      }}
                    >
                      EREN
                    </motion.h1>

                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <motion.div
                        className="text-2xl lg:text-3xl mb-6 tracking-[0.25em] text-cyan-300"
                        style={{
                          fontFamily: PIXEL_FONT,
                          textShadow: '0 0 20px #00ffff'
                        }}
                      >
                        ADVENTURE PORTFOLIO
                      </motion.div>
                      <motion.div
                        className="text-lg tracking-wider text-cyan-500 mb-8"
                        style={{ fontFamily: PIXEL_FONT }}
                      >
                        FULL STACK DEVELOPER
                      </motion.div>

                      <motion.div
                        className="flex flex-wrap justify-center gap-3 text-xs uppercase tracking-[0.3rem] text-emerald-300/80 mb-12"
                        style={{ fontFamily: PIXEL_FONT }}
                      >
                        <span>React</span>
                        <span className="text-cyan-400">•</span>
                        <span>TypeScript</span>
                        <span className="text-cyan-400">•</span>
                        <span>Pixel Art</span>
                        <span className="text-cyan-400">•</span>
                        <span>Creative Coding</span>
                      </motion.div>
                    </motion.div>

                    <motion.div
                      className="flex items-center gap-6 text-xl px-8 py-4 border-2 border-yellow-400 bg-black/60"
                      style={{
                        fontFamily: PIXEL_FONT,
                        color: '#ffff00',
                        textShadow: '0 0 15px #ffff00',
                        boxShadow: '0 0 30px rgba(255,255,0,0.3)'
                      }}
                      animate={{
                        opacity: [0.7, 1, 0.7],
                        scale: [0.98, 1.02, 0.98]
                      }}
                      transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                    >
                      <span className="text-3xl">🎯</span>
                      <span className="tracking-widest">CLICK ANYWHERE TO START</span>
                      <span className="text-3xl">🎯</span>
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
