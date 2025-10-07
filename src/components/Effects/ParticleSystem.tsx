import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Particle {
  id: string
  x: number
  y: number
  type: 'coin' | 'sparkle'
  vx?: number
  vy?: number
  rotation?: number
  size?: number
  color?: string
}

const ParticleSystem = () => {
  const [particles, setParticles] = useState<Particle[]>([])
  const [sparkles, setSparkles] = useState<Particle[]>([])

  // Coin Explosion on Click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const newParticles: Particle[] = []
      const particleCount = 15

      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount
        const velocity = 3 + Math.random() * 4
        const size = 20 + Math.random() * 15

        newParticles.push({
          id: `coin-${Date.now()}-${i}`,
          x: e.clientX,
          y: e.clientY,
          type: 'coin',
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity - 2, // Slight upward bias
          rotation: Math.random() * 360,
          size,
          color: i % 2 === 0 ? '#FFD700' : '#FF6347'
        })
      }

      setParticles(prev => [...prev, ...newParticles])

      // Remove particles after animation
      setTimeout(() => {
        setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)))
      }, 2000)
    }

    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [])

  // Sparkle Trail on Mouse Move
  useEffect(() => {
    let throttle = false

    const handleMouseMove = (e: MouseEvent) => {
      if (throttle) return
      throttle = true

      setTimeout(() => {
        throttle = false
      }, 50)

      const newSparkle: Particle = {
        id: `sparkle-${Date.now()}-${Math.random()}`,
        x: e.clientX,
        y: e.clientY,
        type: 'sparkle',
        size: 8 + Math.random() * 8,
        color: Math.random() > 0.5 ? '#FFD700' : '#FF6347'
      }

      setSparkles(prev => [...prev, newSparkle])

      // Remove sparkle after fade
      setTimeout(() => {
        setSparkles(prev => prev.filter(s => s.id !== newSparkle.id))
      }, 800)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {/* Coin Explosions */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size
            }}
            initial={{
              x: 0,
              y: 0,
              scale: 0,
              rotate: particle.rotation,
              opacity: 1
            }}
            animate={{
              x: (particle.vx || 0) * 100,
              y: (particle.vy || 0) * 100 + 150, // Gravity effect
              scale: [0, 1.2, 1],
              rotate: (particle.rotation || 0) + 720,
              opacity: [1, 1, 0]
            }}
            exit={{
              opacity: 0,
              scale: 0
            }}
            transition={{
              duration: 1.5,
              ease: 'easeOut'
            }}
          >
            {/* Coin */}
            <div
              className="w-full h-full rounded-full flex items-center justify-center font-bold"
              style={{
                background: `linear-gradient(135deg, ${particle.color} 0%, ${particle.color === '#FFD700' ? '#FFA500' : '#DC143C'} 100%)`,
                boxShadow: `0 0 20px ${particle.color}, 0 0 30px ${particle.color}`,
                border: `2px solid ${particle.color === '#FFD700' ? '#FFA500' : '#8B0000'}`,
                fontSize: `${(particle.size || 20) * 0.5}px`,
                color: '#FFF',
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
              }}
            >
              $
            </div>
          </motion.div>
        ))}

        {/* Sparkle Trail */}
        {sparkles.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            className="absolute"
            style={{
              left: sparkle.x - (sparkle.size || 8) / 2,
              top: sparkle.y - (sparkle.size || 8) / 2,
              width: sparkle.size,
              height: sparkle.size
            }}
            initial={{
              scale: 0,
              rotate: 0,
              opacity: 1
            }}
            animate={{
              scale: [0, 1.5, 0],
              rotate: 360,
              opacity: [1, 0.8, 0]
            }}
            exit={{
              opacity: 0,
              scale: 0
            }}
            transition={{
              duration: 0.6,
              ease: 'easeOut'
            }}
          >
            {/* Star Shape */}
            <div className="relative w-full h-full">
              {/* Horizontal bar */}
              <div
                className="absolute"
                style={{
                  top: '50%',
                  left: '0',
                  right: '0',
                  height: '20%',
                  background: sparkle.color,
                  boxShadow: `0 0 10px ${sparkle.color}`,
                  transform: 'translateY(-50%)'
                }}
              />
              {/* Vertical bar */}
              <div
                className="absolute"
                style={{
                  left: '50%',
                  top: '0',
                  bottom: '0',
                  width: '20%',
                  background: sparkle.color,
                  boxShadow: `0 0 10px ${sparkle.color}`,
                  transform: 'translateX(-50%)'
                }}
              />
              {/* Diagonal bar 1 */}
              <div
                className="absolute"
                style={{
                  top: '50%',
                  left: '50%',
                  width: '100%',
                  height: '20%',
                  background: sparkle.color,
                  boxShadow: `0 0 10px ${sparkle.color}`,
                  transform: 'translate(-50%, -50%) rotate(45deg)'
                }}
              />
              {/* Diagonal bar 2 */}
              <div
                className="absolute"
                style={{
                  top: '50%',
                  left: '50%',
                  width: '100%',
                  height: '20%',
                  background: sparkle.color,
                  boxShadow: `0 0 10px ${sparkle.color}`,
                  transform: 'translate(-50%, -50%) rotate(-45deg)'
                }}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default ParticleSystem
