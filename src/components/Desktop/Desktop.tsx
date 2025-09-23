import { useEffect, useMemo, useState } from 'react'
import type { ReactNode, MouseEvent as ReactMouseEvent } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useSoundContext } from '../../contexts/SoundContext'
import DesktopIcon from './DesktopIcon'
import Taskbar from './Taskbar'
import type { TaskbarApp } from './Taskbar'
import NewStartMenu from './NewStartMenu'
import DesktopWindow from './DesktopWindow'
import Wallpaper from './Wallpaper'
import InteractiveTerminal from '../Terminal/InteractiveTerminal'
import SoundControls from '../UI/SoundControls'
import SimpleMusicPlayer from '../MusicPlayer/SimpleMusicPlayer'
import MiniMusicPlayer from '../MusicPlayer/MiniMusicPlayer'

const ProjectsContent = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  const projects = [
    {
      id: 'previa',
      title: 'Previa Health',
      subtitle: 'AI-powered MSK dysfunction prevention',
      year: '2025 - Active',
      status: 'Active Funding',
      color: 'from-[#7ba7bc] to-[#9fbec8]',
      shadowColor: 'rgba(123, 167, 188, 0.4)',
      accent: '#7ba7bc',
      icon: '🏥',
      tags: ['Computer Vision', 'Healthcare', 'AI', 'Preventive Medicine'],
      shortDesc: 'Detecting movement problems before they become chronic pain through smartphone-based biomechanics analysis.',
      description: 'Built computer vision system detecting movement problems before they become chronic pain. Using proprietary algorithms to analyze biomechanics via smartphone. Validated with clinical datasets, €300k pre-seed secured.',
      highlights: [
        '€300k pre-seed funding secured from healthcare VCs',
        'Research collaboration with SpoHo Cologne & Uni Bonn',
        'Position-invariant pose estimation algorithms',
        'Smartphone-based movement analysis for early intervention'
      ],
      details: {
        funding: '€300k pre-seed secured from healthcare-focused VCs',
        research: 'Clinical validation with SpoHo Cologne & University of Bonn',
        innovation: 'Proprietary position-invariant pose estimation algorithms',
        market: 'Preventive healthcare targeting MSK dysfunction',
        vision: 'Building Munich\'s next unicorn in healthcare AI',
        tech: ['Python', 'TensorFlow', 'MediaPipe', 'React', 'Supabase', 'Computer Vision'],
        impact: 'Preventing chronic pain through early detection and intervention',
        website: 'https://www.previa.health'
      }
    },
    {
      id: 'athly',
      title: 'Athly',
      subtitle: 'Multimodal fitness AI (before it was cool)',
      year: '2024',
      status: 'Completed',
      color: 'from-[#a8b5a0] to-[#bcc9b4]',
      shadowColor: 'rgba(168, 181, 160, 0.4)',
      accent: '#a8b5a0',
      icon: '🤖',
      tags: ['Multimodal AI', 'Fitness', 'Mobile', 'Behavioral Learning'],
      shortDesc: 'Autonomous fitness assistant combining voice analysis, camera tracking, and behavioral learning for personalized workout optimization.',
      description: 'Developed autonomous fitness assistant combining voice analysis, camera tracking, and behavioral learning. Predicted optimal workout timing and nutrition - basically built AI agents before ChatGPT made them mainstream.',
      highlights: [
        'Built multimodal AI agents before mainstream adoption',
        'Combined voice analysis + camera tracking + behavior patterns',
        'Predictive workout timing and nutrition optimization',
        'Pioneered autonomous fitness intelligence'
      ],
      details: {
        innovation: 'Built AI agents before ChatGPT made them mainstream',
        approach: 'Multimodal AI combining voice, vision, and behavioral data',
        intelligence: 'Predicted optimal workout timing and nutrition patterns',
        achievement: 'Early pioneer in autonomous fitness AI',
        market: 'Personalized fitness coaching and optimization',
        tech: ['Multimodal ML', 'React Native', 'Supabase', 'Voice Analysis', 'Computer Vision'],
        impact: 'Advanced personalized fitness intelligence through multimodal AI',
        website: 'https://www.athly.de'
      }
    },
    {
      id: 'energy',
      title: 'Energy Forecast System',
      subtitle: 'Renewable energy prediction beating meteorologists',
      year: '2023',
      status: 'Research',
      color: 'from-[#d4a574] to-[#e3b888]',
      shadowColor: 'rgba(212, 165, 116, 0.4)',
      accent: '#d4a574',
      icon: '⚡',
      tags: ['Neural Networks', 'Time Series', 'Climate Data', 'Renewable Energy'],
      shortDesc: 'LSTM + Random Forest models processing nationwide German weather data with higher accuracy than standard meteorological systems.',
      description: 'Created LSTM + Random Forest models processing nationwide German weather data. Achieved higher accuracy than standard meteorological systems for agricultural planning. Because clean energy needs smart predictions.',
      highlights: [
        'Outperformed standard meteorological forecasting systems',
        'Processed nationwide German weather datasets',
        'Optimized agricultural planning and energy forecasting',
        'Advanced hybrid neural network approach'
      ],
      details: {
        achievement: 'Higher forecast accuracy than standard meteorological systems',
        scope: 'Nationwide German weather data processing and analysis',
        application: 'Agricultural planning and renewable energy optimization',
        methodology: 'Hybrid LSTM + Random Forest neural network approach',
        purpose: 'Clean energy optimization through intelligent predictions',
        tech: ['Python', 'LSTM Networks', 'Random Forest', 'Time Series Analysis', 'Large-scale Data Processing'],
        impact: 'Enhanced renewable energy forecasting for sustainable agriculture'
      }
    }
  ]

  if (selectedProject) {
    const project = projects.find(p => p.id === selectedProject)
    if (!project) return null
    return (
      <div className="h-full flex flex-col">
        {/* Improved Header with back button */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-[#d0c4b0]">
          <button
            onClick={() => setSelectedProject(null)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 border-[#d0c4b0] bg-white/90 hover:bg-[#faf3e5] hover:scale-105 transition-all duration-200 shadow-[2px_2px_0_0_rgba(139,111,71,0.2)] hover:shadow-[3px_3px_0_0_rgba(139,111,71,0.3)]"
          >
            <span className="text-[#7c6544] text-sm">←</span>
            <span className="font-pixel text-[10px] uppercase tracking-[0.2em] text-[#7c6544]">Back to Projects</span>
          </button>
          <div className="flex items-center gap-4">
            <div className="text-3xl">{project.icon}</div>
            <div className="text-right">
              <h2 className="font-pixel text-[16px] uppercase tracking-[0.3em] text-[#5d4e37] mb-1">{project.title}</h2>
              <p className="text-[12px] text-[#8b6f47] font-medium">{project.subtitle}</p>
              <span className={`inline-block mt-1 px-3 py-1 rounded-full text-[9px] font-pixel uppercase tracking-[0.1em] text-white bg-gradient-to-r ${project.color} shadow-sm`}>
                {project.status}
              </span>
            </div>
          </div>
        </div>

        {/* Project detail content - Resume-inspired clean design */}
        <div className="flex-1 space-y-6 overflow-y-auto">
          {/* Project Overview - Enhanced with prominent CTA */}
          <section className="rounded-lg border-2 border-[#d0c4b0] bg-white p-4 shadow-[4px_4px_0_0_rgba(139,111,71,0.2)]">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-pixel text-[12px] uppercase tracking-[0.35em] text-[#7c6544]">
                  {project.title}
                </h3>
                <p className="text-[13px] font-semibold mb-2">{project.subtitle}</p>
                <span className="inline-block rounded-md border border-[#d0c4b0] bg-[#faf3e5] px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-[#886746]">
                  {project.year}
                </span>
              </div>
              {project.details.website && (
                <div className="flex flex-col items-end gap-2">
                  <a
                    href={project.details.website}
                    target="_blank"
                    rel="noreferrer"
                    className={`group relative overflow-hidden px-6 py-3 bg-gradient-to-r ${project.color} text-white text-[11px] font-pixel uppercase tracking-[0.15em] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-white/20`}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      🚀 Visit Live Site
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  </a>
                  <p className="text-[9px] text-[#8b6f47] italic">Click to view live demo</p>
                </div>
              )}
            </div>
            <p className="text-[12px] leading-relaxed text-[#5d4e37]">{project.description}</p>
          </section>

          {/* Key Achievements */}
          <section className="rounded-lg border-2 border-[#d0c4b0] bg-[#faf7f0]/90 p-4 shadow-[4px_4px_0_0_rgba(139,111,71,0.2)]">
            <h3 className="font-pixel text-[12px] uppercase tracking-[0.35em] text-[#7c6544] mb-3">
              Key Achievements
            </h3>
            <ul className="space-y-2 text-[12px]">
              {project.highlights.map((highlight, i) => (
                <li key={i}>• {highlight}</li>
              ))}
            </ul>
          </section>

          {/* Technology Stack - Resume style */}
          <section className="space-y-5 rounded-lg border-2 border-[#d0c4b0] bg-[#faf7f0]/90 p-5 shadow-[4px_4px_0_0_rgba(139,111,71,0.2)]">
            <h3 className="font-pixel text-[12px] uppercase tracking-[0.3em] text-[#7c6544] mb-3">
              Technology Stack
            </h3>
            <div className="bg-white/80 rounded-md p-3 border border-[#e5d8c6]">
              <div className="flex flex-wrap gap-1.5 text-[10px]">
                {project.details.tech.map((tech) => (
                  <span key={tech} className={`rounded-full border border-[#d0c4b0] bg-gradient-to-r ${project.color} text-white px-2.5 py-1 shadow-[1px_1px_0_0_rgba(139,111,71,0.2)]`}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Project Details - Clean sections */}
          <div className="space-y-4">
            {Object.entries(project.details).filter(([key]) => key !== 'tech' && key !== 'website' && key !== 'impact').map(([key, value]) => (
              <section key={key} className="rounded-lg border-2 border-[#d0c4b0] bg-white p-4 shadow-[4px_4px_0_0_rgba(139,111,71,0.2)]">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-pixel text-[12px] uppercase tracking-[0.35em] text-[#7c6544]">
                    {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </h3>
                </div>
                {Array.isArray(value) ? (
                  <div className="flex flex-wrap gap-1.5">
                    {value.map((item, i) => (
                      <span key={i} className="px-2 py-1 bg-[#faf3e5] border border-[#e5d8c6] rounded-md text-[10px] text-[#8b6f47]">
                        {item}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-[12px] leading-relaxed text-[#5d4e37]">{value}</p>
                )}
              </section>
            ))}
          </div>

          {/* Impact Statement */}
          <section className="rounded-lg border-2 border-[#d0c4b0] bg-white p-4 shadow-[4px_4px_0_0_rgba(139,111,71,0.2)]">
            <h3 className="font-pixel text-[12px] uppercase tracking-[0.35em] text-[#7c6544] mb-3">
              Impact & Vision
            </h3>
            <p className="text-[12px] leading-relaxed text-[#5d4e37]">{project.details.impact}</p>
          </section>
        </div>
      </div>
    )
  }

  // Main grid view
  return (
    <div className="h-full flex flex-col">
      {/* Enhanced Archive Header */}
      <div className="mb-8 pb-6 border-b-2 border-[#d0c4b0] bg-gradient-to-r from-[#faf7f0]/50 to-transparent rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-gradient-to-br from-[#7ba7bc] to-[#9fbec8] text-white shadow-lg">
              <span className="text-2xl">💼</span>
            </div>
            <div>
              <h2 className="font-pixel text-[16px] uppercase tracking-[0.3em] text-[#5d4e37] mb-1">Project Archive</h2>
              <p className="text-[12px] text-[#8b6f47]">Building the future, one project at a time</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-pixel uppercase tracking-[0.2em] text-[#7c6544]">{projects.length} Projects</p>
            <p className="text-[9px] text-[#8b6f47]">Click any card to explore</p>
          </div>
        </div>
      </div>

      {/* Enhanced Grid Layout */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 pb-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project.id)}
              className="group relative bg-white/95 rounded-xl border-2 border-[#d0c4b0] p-6 cursor-pointer transition-all duration-500 hover:scale-[1.03] shadow-[4px_4px_0_0_rgba(139,111,71,0.2)] hover:shadow-[8px_8px_0_0_rgba(139,111,71,0.4)] min-h-[380px] flex flex-col overflow-hidden"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              {/* Enhanced Project Header */}
              <div className="relative mb-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${project.color} text-white shadow-md group-hover:shadow-lg transition-all duration-300`}>
                      <span className="text-xl group-hover:scale-110 transition-transform duration-300">{project.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-pixel text-[13px] uppercase tracking-[0.25em] text-[#5d4e37] mb-2 group-hover:text-[#7c6544] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-[12px] text-[#8b6f47] font-medium leading-relaxed mb-2">
                        {project.subtitle}
                      </p>
                      <span className="inline-block text-[10px] font-pixel uppercase tracking-[0.15em] text-[#8b6f47] bg-[#faf3e5] px-3 py-1 rounded-full border border-[#e5d8c6]">
                        {project.year}
                      </span>
                    </div>
                  </div>
                  <div className={`px-3 py-1.5 rounded-full text-[9px] font-pixel uppercase tracking-[0.1em] text-white bg-gradient-to-r ${project.color} shadow-md ${project.status === 'Active Funding' ? 'animate-pulse' : ''}`}>
                    {project.status}
                  </div>
                </div>
              </div>

              {/* Project Description */}
              <div className="flex-1 mb-5">
                <p className="text-[11px] text-[#8b6f47] leading-relaxed line-clamp-3">
                  {project.shortDesc}
                </p>
              </div>

              {/* Key Highlights Preview */}
              <div className="mb-5">
                <h4 className="text-[10px] font-pixel uppercase tracking-[0.2em] text-[#7c6544] mb-3">Key Highlights</h4>
                <div className="space-y-2">
                  {project.highlights.slice(0, 2).map((highlight, i) => (
                    <div key={i} className="flex items-start gap-2 p-2 bg-[#faf7f0] rounded-md border border-[#e5d8c6]">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${project.color} mt-1.5 flex-shrink-0`}></div>
                      <p className="text-[10px] text-[#5d4e37] leading-relaxed">{highlight.split(' ').slice(0, 6).join(' ')}...</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Preview */}
              <div className="mb-5">
                <h4 className="text-[10px] font-pixel uppercase tracking-[0.2em] text-[#7c6544] mb-2">Tech Stack</h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className={`px-2 py-1 bg-gradient-to-r ${project.color} text-white rounded-full text-[8px] font-medium shadow-sm`}>
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-2 py-1 bg-[#f0e5d4] border border-[#d0c4b0] rounded-full text-[8px] text-[#9b7a52] font-medium">
                      +{project.tags.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Enhanced CTA Section */}
              <div className="mt-auto pt-4 border-t-2 border-[#e5d8c6]">
                <div className="flex items-center justify-between">
                  {project.details.website ? (
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${project.color} animate-pulse`}></div>
                      <span className="text-[9px] text-[#22c55e] font-pixel uppercase tracking-[0.1em]">Live Site Available</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${project.color}`}></div>
                      <span className="text-[9px] text-[#8b6f47] font-pixel uppercase tracking-[0.1em]">{project.status}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-[9px] text-[#9b7a52] font-pixel uppercase tracking-[0.1em]">
                      Explore Project
                    </span>
                    <span className="text-[12px]">→</span>
                  </div>
                </div>
              </div>

              {/* Enhanced Hover Effects */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-8 transition-all duration-500 rounded-xl`}></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl border-2 border-transparent group-hover:border-white/20"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

type WindowId = 'about' | 'projects' | 'terminal' | 'resume' | 'contact' | 'games' | 'websites' | 'documents' | 'music'

type WindowConfig = {
  title: string
  icon: string
  position: { x: number; y: number }
  content: ReactNode
  size?: { width: number; height: number }
}

type WindowOriginMap = Partial<Record<WindowId, { x: number; y: number }>>
type WindowPositionMap = Partial<Record<WindowId, { x: number; y: number }>>

const WINDOW_CONFIG: Record<WindowId, WindowConfig> = {
  about: {
    title: 'ABOUT_ME.EXE',
    icon: '👤',
    position: { x: 220, y: 140 },
    content: (
      <div className="space-y-6 text-left font-pixel-content text-[14px] leading-[1.8] tracking-[0.01em] text-[#433222]">
        <section className="rounded-lg border-2 border-[#d0c4b0] bg-white/95 p-4 shadow-[4px_4px_0_0_rgba(139,111,71,0.2)]">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src="/PixelMe.jpg"
                alt="Pixel art portrait of Eren"
                className="block rounded-lg border-2 border-[#d0c4b0] bg-[#faf3e5] shadow-[3px_3px_0_0_rgba(139,111,71,0.3)] object-cover"
                style={{
                  imageRendering: 'pixelated',
                  width: '192px',
                  height: '192px',
                  maxWidth: '192px',
                  maxHeight: '192px',
                  minWidth: '192px',
                  minHeight: '192px'
                }}
                loading="lazy"
              />
              <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full border border-[#16a34a] bg-[#22c55e] shadow-[1px_1px_0_0_rgba(139,111,71,0.4)]"></div>
            </div>
            <div className="space-y-3 text-center">
              <p>
                Hey there! I'm Eren, an AI engineer and founder who believes code can prevent suffering before it starts.
                Currently building the future of preventive healthcare through computer vision and multimodal AI.
              </p>
              <p className="text-[13px] opacity-90">
                When I'm not training neural networks, you'll find me improvising on piano, or working from random cafés
                around the world. From athlete to tech builder - I approach startups like sports: it's all about discipline, teamwork,
                and knowing when to pivot.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 rounded-lg border-2 border-[#d0c4b0] bg-[#faf3e5]/85 p-4 shadow-[4px_4px_0_0_rgba(139,111,71,0.15)] md:grid-cols-2">
          <div className="space-y-2">
            <h3 className="font-pixel text-[11px] uppercase tracking-[0.3em] text-[#7c6544]">
              Core Focus
            </h3>
            <ul className="space-y-2 text-[12px] leading-relaxed">
              <li>🔬 Computer Vision & ML for healthcare innovation</li>
              <li>🧠 Building AI that discovers patterns humans can't see</li>
              <li>⚡ Turning academic research into real-world impact</li>
              <li>🌍 Remote-first lifestyle with global perspective</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-pixel text-[11px] uppercase tracking-[0.3em] text-[#7c6544]">
              Snapshot Stats
            </h3>
            <div className="grid gap-2 text-[12px]">
              <div className="rounded-md border border-[#d0c4b0] bg-white/90 px-3 py-2 shadow-[2px_2px_0_0_rgba(139,111,71,0.18)]">
                <span className="block text-[10px] uppercase tracking-[0.3em] text-[#9b7a52]">Years in AI</span>
                <span className="text-[14px] font-semibold">4+</span>
              </div>
              <div className="rounded-md border border-[#d0c4b0] bg-white/90 px-3 py-2 shadow-[2px_2px_0_0_rgba(139,111,71,0.18)]">
                <span className="block text-[10px] uppercase tracking-[0.3em] text-[#9b7a52]">Funding Raised</span>
                <span className="text-[14px] font-semibold">€300k</span>
              </div>
              <div className="rounded-md border border-[#d0c4b0] bg-white/90 px-3 py-2 shadow-[2px_2px_0_0_rgba(139,111,71,0.18)]">
                <span className="block text-[10px] uppercase tracking-[0.3em] text-[#9b7a52]">Current Mood</span>
                <span className="text-[14px] font-semibold">Caffeinated & Optimistic</span>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-3 rounded-lg border-2 border-[#d0c4b0] bg-white/95 p-4 shadow-[4px_4px_0_0_rgba(139,111,71,0.2)]">
          <h3 className="font-pixel text-[11px] uppercase tracking-[0.3em] text-[#7c6544]">
            Currently Exploring
          </h3>
          <ul className="space-y-2 text-[12px]">
            <li>🎯 Multimodal health intelligence (movement + voice + face)</li>
            <li>📐 Position-invariant pose estimation algorithms</li>
            <li>🦄 Currently building Cologne/Bonn's (relocating 2025 hopefully)</li>
            <li>🧬 The intersection of longevity and prevention</li>
          </ul>
        </section>
      </div>
    ),
  },
  projects: {
    title: 'PROJECTS.EXE',
    icon: '💼',
    position: { x: 540, y: 180 },
    content: <ProjectsContent />,
  },
  terminal: {
    title: 'TERMINAL.EXE',
    icon: '💻',
    position: { x: 300, y: 80 },
    content: <InteractiveTerminal />,
  },
  resume: {
    title: 'RESUME.PDF',
    icon: '📄',
    position: { x: 140, y: 360 },
    content: (
      <div className="space-y-6 text-left font-pixel-content text-[14px] leading-[1.8] tracking-[0.01em] text-[#3f2f1f]">
        <section className="rounded-lg border-2 border-[#d0c4b0] bg-white p-4 shadow-[4px_4px_0_0_rgba(139,111,71,0.2)]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-pixel text-[12px] uppercase tracking-[0.35em] text-[#7c6544]">
                Current Role
              </h3>
              <p className="text-[13px] font-semibold">Founder & AI Engineer @ Previa Health</p>
            </div>
            <span className="rounded-md border border-[#d0c4b0] bg-[#faf3e5] px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-[#886746]">
              2025 → Now
            </span>
          </div>
          <ul className="mt-3 space-y-2 text-[12px]">
            <li>• Building computer vision for preventive healthcare</li>
            <li>• Secured pre-seed funding from healthcare-focused VCs</li>
            <li>• Research collaboration with SpoHo Cologne & Uni Bonn</li>
          </ul>
        </section>

        <section className="rounded-lg border-2 border-[#d0c4b0] bg-[#faf7f0]/90 p-4 shadow-[4px_4px_0_0_rgba(139,111,71,0.2)]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-pixel text-[12px] uppercase tracking-[0.35em] text-[#7c6544]">
              Background
            </h3>
            <span className="rounded-md border border-[#d0c4b0] bg-[#faf3e5] px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-[#886746]">
              2020 → 2025
            </span>
          </div>
          <p className="text-[13px] font-semibold mb-2">Computer Science @ University of Bonn</p>
          <ul className="space-y-2 text-[12px]">
            <li>• Bachelor thesis supervised by Prof. Jürgen Gall (Lamarr Institute)</li>
            <li>• Thesis: Position-invariant pose estimation for physiotherapeutic applications</li>
            <li>• University Accelerator Program participant</li>
          </ul>
        </section>

        <section className="space-y-5 rounded-lg border-2 border-[#d0c4b0] bg-[#faf7f0]/90 p-5 shadow-[4px_4px_0_0_rgba(139,111,71,0.2)]">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-pixel text-[12px] uppercase tracking-[0.3em] text-[#7c6544] mb-3">
                Technical Skills
              </h3>
              <div className="space-y-4">
                <div className="bg-white/80 rounded-md p-3 border border-[#e5d8c6]">
                  <h4 className="text-[10px] font-pixel uppercase tracking-[0.2em] text-[#9b7a52] mb-2">AI & Machine Learning</h4>
                  <div className="flex flex-wrap gap-1.5 text-[10px]">
                    {['PyTorch', 'TensorFlow', 'Computer Vision', 'Time Series', 'MediaPipe'].map((chip) => (
                      <span key={chip} className="rounded-full border border-[#d0c4b0] bg-gradient-to-r from-[#7ba7bc] to-[#9fbec8] text-white px-2.5 py-1 shadow-[1px_1px_0_0_rgba(139,111,71,0.2)]">
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-white/80 rounded-md p-3 border border-[#e5d8c6]">
                  <h4 className="text-[10px] font-pixel uppercase tracking-[0.2em] text-[#9b7a52] mb-2">Development</h4>
                  <div className="flex flex-wrap gap-1.5 text-[10px]">
                    {['Python', 'TypeScript', 'React', 'React Native', 'FastAPI', 'Supabase'].map((chip) => (
                      <span key={chip} className="rounded-full border border-[#d0c4b0] bg-gradient-to-r from-[#a8b5a0] to-[#bcc9b4] text-white px-2.5 py-1 shadow-[1px_1px_0_0_rgba(139,111,71,0.2)]">
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-white/80 rounded-md p-3 border border-[#e5d8c6]">
                  <h4 className="text-[10px] font-pixel uppercase tracking-[0.2em] text-[#9b7a52] mb-2">Specialization</h4>
                  <div className="flex flex-wrap gap-1.5 text-[10px]">
                    {['Pose Estimation', 'Multimodal AI', 'Healthcare Tech'].map((chip) => (
                      <span key={chip} className="rounded-full border border-[#d0c4b0] bg-gradient-to-r from-[#d4a574] to-[#e3b888] text-white px-2.5 py-1 shadow-[1px_1px_0_0_rgba(139,111,71,0.2)]">
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-pixel text-[12px] uppercase tracking-[0.3em] text-[#7c6544] mb-3">
                Key Achievements
              </h3>
              <div className="space-y-3">
                <div className="bg-white/90 rounded-lg p-3 border-l-4 border-[#7ba7bc] shadow-[2px_2px_0_0_rgba(139,111,71,0.15)]">
                  <div className="text-[11px] font-semibold text-[#5d4e37] mb-1">💰 Funding Success</div>
                  <div className="text-[10px] text-[#8b6f47]">€300k pre-seed secured</div>
                </div>
                <div className="bg-white/90 rounded-lg p-3 border-l-4 border-[#a8b5a0] shadow-[2px_2px_0_0_rgba(139,111,71,0.15)]">
                  <div className="text-[11px] font-semibold text-[#5d4e37] mb-1">🔬 Research Impact</div>
                  <div className="text-[10px] text-[#8b6f47]">Publishing pose estimation research</div>
                </div>
                <div className="bg-white/90 rounded-lg p-3 border-l-4 border-[#d4a574] shadow-[2px_2px_0_0_rgba(139,111,71,0.15)]">
                  <div className="text-[11px] font-semibold text-[#5d4e37] mb-1">🎯 Early Adopter</div>
                  <div className="text-[10px] text-[#8b6f47]">Built AI products pre-mainstream</div>
                </div>
                <div className="bg-white/90 rounded-lg p-3 border-l-4 border-[#b5a7d6] shadow-[2px_2px_0_0_rgba(139,111,71,0.15)]">
                  <div className="text-[11px] font-semibold text-[#5d4e37] mb-1">🎤 Speaking</div>
                  <div className="text-[10px] text-[#8b6f47]">AI + preventive healthcare talks</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-lg border-2 border-[#d0c4b0] bg-white/95 p-4 text-[12px] shadow-[4px_4px_0_0_rgba(139,111,71,0.2)]">
          <div className="flex items-start gap-3">
            <div className="text-2xl">📋</div>
            <div>
              <p className="mb-2">
                Currently working on computer vision systems that detect movement problems before they become chronic pain.
                Open to collaborations in healthcare AI and preventive medicine.
              </p>
               <p className="text-[11px] text-[#8b6f47] bg-[#faf3e5] px-3 py-2 rounded-md border border-[#e5d8c6]">
                 💡 <strong>Full PDF resume</strong> available via <span className="font-pixel text-[#7c6544]">Start → Documents</span> or terminal command <code className="font-pixel text-[#7c6544]">documents</code>
               </p>
            </div>
          </div>
        </section>
      </div>
    ),
  },
  contact: {
    title: 'CONTACT.ME',
    icon: '📧',
    position: { x: 620, y: 80 },
    content: (
      <div className="space-y-6 text-left font-pixel-content text-[14px] leading-[1.8] tracking-[0.01em] text-[#433222]">
        <section className="rounded-lg border-2 border-[#d0c4b0] bg-white/95 p-4 shadow-[4px_4px_0_0_rgba(139,111,71,0.2)]">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🤝</span>
            <div>
              <h3 className="font-pixel text-[11px] uppercase tracking-[0.3em] text-[#7c6544]">
                Let's Build Something
              </h3>
              <p className="text-[12px] text-[#8b6f47] mt-1">Open for collaboration & opportunities</p>
            </div>
          </div>
          <p className="text-[13px] leading-relaxed">
            Looking for a <strong>technical co-founder</strong> or want to collaborate on AI/healthcare projects? 
            Currently building Cologne/Bonn's next unicorn and always excited to connect with fellow builders, 
            researchers, and visionaries in the preventive healthcare space.
          </p>
        </section>

        <section className="grid gap-4 rounded-lg border-2 border-[#d0c4b0] bg-[#faf3e5]/85 p-4 shadow-[4px_4px_0_0_rgba(139,111,71,0.15)]">
          <div className="flex items-center gap-3">
            <span className="text-xl">📧</span>
            <div>
              <h4 className="font-pixel text-[11px] uppercase tracking-[0.3em] text-[#7c6544]">Business Inquiries</h4>
              <a
                href="mailto:erendemir10022@gmail.com"
                className="text-[#54768a] underline-offset-2 hover:underline text-[13px]"
              >
                erendemir10022@gmail.com
              </a>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-xl">💼</span>
            <div>
              <h4 className="font-pixel text-[11px] uppercase tracking-[0.3em] text-[#7c6544]">LinkedIn</h4>
              <a
                href="https://www.linkedin.com/in/eren-demir-4ba56a350"
                target="_blank"
                rel="noreferrer"
                className="text-[#54768a] underline-offset-2 hover:underline text-[13px]"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xl">🐙</span>
            <div>
              <h4 className="font-pixel text-[11px] uppercase tracking-[0.3em] text-[#7c6544]">GitHub</h4>
              <a
                href="https://github.com/s6endemi"
                target="_blank"
                rel="noreferrer"
                className="text-[#54768a] underline-offset-2 hover:underline text-[13px]"
              >
                View Code & Projects
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xl">🏥</span>
            <div>
              <h4 className="font-pixel text-[11px] uppercase tracking-[0.3em] text-[#7c6544]">Previa Health</h4>
              <a
                href="https://www.previa.health"
                target="_blank"
                rel="noreferrer"
                className="text-[#54768a] underline-offset-2 hover:underline text-[13px]"
              >
                Current Startup
              </a>
            </div>
          </div>
        </section>

        <section className="rounded-lg border-2 border-[#d0c4b0] bg-white/95 p-4 shadow-[4px_4px_0_0_rgba(139,111,71,0.2)]">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xl">🌍</span>
            <h3 className="font-pixel text-[11px] uppercase tracking-[0.3em] text-[#7c6544]">
              Current Location & Availability
            </h3>
          </div>
          <div className="space-y-2 text-[13px] leading-relaxed">
            <p>
              <span className="text-[#8b6f47]">📍 Based in:</span> Cologne/Bonn, Germany
            </p>
            <p>
              <span className="text-[#8b6f47]">☕ Working from:</span> Random cafés around the world
            </p>
            <p>
              <span className="text-[#8b6f47]">🤝 Open to:</span> Co-founder discussions, research collaborations, 
              healthcare AI consulting
            </p>
            <p className="text-[12px] text-[#8b6f47] mt-3">
              Terminal command <code className="ml-1 rounded bg-[#f0e5d4] px-1 py-0.5 text-[11px]">contact</code> 
              for quick info access!
            </p>
          </div>
        </section>
      </div>
    ),
  },
  websites: {
    title: 'WEBSITES.HTM',
    icon: '🌐',
    position: { x: 420, y: 200 },
    content: (
      <div className="space-y-6 text-left font-pixel-content text-[14px] leading-[1.8] tracking-[0.01em] text-[#433222]">
        <section className="rounded-lg border-2 border-[#d0c4b0] bg-white/95 p-5 shadow-[4px_4px_0_0_rgba(139,111,71,0.2)]">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🎨</span>
            <div>
              <h3 className="font-pixel text-[11px] uppercase tracking-[0.3em] text-[#7c6544]">
                Frontend Showcase
              </h3>
              <p className="text-[12px] text-[#8b6f47] mt-1">Landing pages & web design</p>
            </div>
          </div>
          <p className="text-[13px] leading-relaxed mb-4">
            Collection of landing pages and frontend projects showcasing design skills and modern web development.
          </p>
        </section>

        <section className="space-y-4">
          <div className="bg-white/95 rounded-lg border-2 border-[#d0c4b0] p-5 shadow-[3px_3px_0_0_rgba(139,111,71,0.2)] hover:shadow-[4px_4px_0_0_rgba(139,111,71,0.3)] transition-all duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-xl">🏥</span>
                <div>
                  <h4 className="font-pixel text-[12px] uppercase tracking-[0.2em] text-[#5d4e37] mb-1">Previa Health</h4>
                  <p className="text-[11px] text-[#8b6f47]">AI Healthcare Platform</p>
                </div>
              </div>
              <a
                href="https://www.previa.health"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-gradient-to-r from-[#7ba7bc] to-[#9fbec8] text-white text-[10px] font-pixel uppercase tracking-[0.1em] rounded-full shadow-sm hover:scale-105 transition-transform duration-200"
              >
                Visit Site
              </a>
            </div>
            <p className="text-[12px] text-[#8b6f47] leading-relaxed">
              AI-powered platform for preventive healthcare with computer vision technology.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-2 py-1 bg-[#faf3e5] border border-[#e5d8c6] rounded-md text-[9px] text-[#8b6f47]">React</span>
              <span className="px-2 py-1 bg-[#faf3e5] border border-[#e5d8c6] rounded-md text-[9px] text-[#8b6f47]">AI/ML</span>
              <span className="px-2 py-1 bg-[#faf3e5] border border-[#e5d8c6] rounded-md text-[9px] text-[#8b6f47]">Healthcare</span>
            </div>
          </div>

          <div className="bg-white/95 rounded-lg border-2 border-[#d0c4b0] p-5 shadow-[3px_3px_0_0_rgba(139,111,71,0.2)] hover:shadow-[4px_4px_0_0_rgba(139,111,71,0.3)] transition-all duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-xl">🤖</span>
                <div>
                  <h4 className="font-pixel text-[12px] uppercase tracking-[0.2em] text-[#5d4e37] mb-1">Athly</h4>
                  <p className="text-[11px] text-[#8b6f47]">Multimodal Fitness AI</p>
                </div>
              </div>
              <a
                href="https://www.athly.de"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-gradient-to-r from-[#a8b5a0] to-[#bcc9b4] text-white text-[10px] font-pixel uppercase tracking-[0.1em] rounded-full shadow-sm hover:scale-105 transition-transform duration-200"
              >
                Visit Site
              </a>
            </div>
            <p className="text-[12px] text-[#8b6f47] leading-relaxed">
              Autonomous fitness assistant combining voice, camera, and behavioral learning.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-2 py-1 bg-[#faf3e5] border border-[#e5d8c6] rounded-md text-[9px] text-[#8b6f47]">React Native</span>
              <span className="px-2 py-1 bg-[#faf3e5] border border-[#e5d8c6] rounded-md text-[9px] text-[#8b6f47]">Multimodal AI</span>
              <span className="px-2 py-1 bg-[#faf3e5] border border-[#e5d8c6] rounded-md text-[9px] text-[#8b6f47]">Fitness</span>
            </div>
          </div>

          <div className="bg-white/95 rounded-lg border-2 border-[#d0c4b0] p-5 shadow-[3px_3px_0_0_rgba(139,111,71,0.2)] hover:shadow-[4px_4px_0_0_rgba(139,111,71,0.3)] transition-all duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-xl">⚡</span>
                <div>
                  <h4 className="font-pixel text-[12px] uppercase tracking-[0.2em] text-[#5d4e37] mb-1">Vigor Protocol</h4>
                  <p className="text-[11px] text-[#8b6f47]">Crypto/DeFi Landing Page</p>
                </div>
              </div>
              <a
                href="https://vigorprotocol.xyz"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-gradient-to-r from-[#d4a574] to-[#e3b888] text-white text-[10px] font-pixel uppercase tracking-[0.1em] rounded-full shadow-sm hover:scale-105 transition-transform duration-200"
              >
                Visit Site
              </a>
            </div>
            <p className="text-[12px] text-[#8b6f47] leading-relaxed">
              Modern landing page for DeFi protocol with clean design and smooth animations.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-2 py-1 bg-[#faf3e5] border border-[#e5d8c6] rounded-md text-[9px] text-[#8b6f47]">React</span>
              <span className="px-2 py-1 bg-[#faf3e5] border border-[#e5d8c6] rounded-md text-[9px] text-[#8b6f47]">Tailwind</span>
              <span className="px-2 py-1 bg-[#faf3e5] border border-[#e5d8c6] rounded-md text-[9px] text-[#8b6f47]">Framer Motion</span>
            </div>
          </div>

          <div className="bg-white/95 rounded-lg border-2 border-[#d0c4b0] p-5 shadow-[3px_3px_0_0_rgba(139,111,71,0.2)] hover:shadow-[4px_4px_0_0_rgba(139,111,71,0.3)] transition-all duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-xl">🚀</span>
                <div>
                  <h4 className="font-pixel text-[12px] uppercase tracking-[0.2em] text-[#5d4e37] mb-1">Aenix</h4>
                  <p className="text-[11px] text-[#8b6f47]">Tech Startup Landing</p>
                </div>
              </div>
              <a
                href="https://aenix.xyz"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 bg-gradient-to-r from-[#a8b5a0] to-[#bcc9b4] text-white text-[10px] font-pixel uppercase tracking-[0.1em] rounded-full shadow-sm hover:scale-105 transition-transform duration-200"
              >
                Visit Site
              </a>
            </div>
            <p className="text-[12px] text-[#8b6f47] leading-relaxed">
              Sleek startup landing page with modern design patterns and responsive layout.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-2 py-1 bg-[#faf3e5] border border-[#e5d8c6] rounded-md text-[9px] text-[#8b6f47]">Next.js</span>
              <span className="px-2 py-1 bg-[#faf3e5] border border-[#e5d8c6] rounded-md text-[9px] text-[#8b6f47]">TypeScript</span>
              <span className="px-2 py-1 bg-[#faf3e5] border border-[#e5d8c6] rounded-md text-[9px] text-[#8b6f47]">CSS3</span>
            </div>
          </div>
        </section>

        <section className="rounded-lg border-2 border-[#d0c4b0] bg-[#faf3e5]/85 p-4 shadow-[4px_4px_0_0_rgba(139,111,71,0.15)]">
          <h4 className="font-pixel text-[11px] uppercase tracking-[0.3em] text-[#7c6544] mb-3">
            Skills Showcase
          </h4>
          <div className="grid grid-cols-2 gap-3 text-[12px]">
            <div>
              <p className="text-[#8b6f47]">🎨 Modern UI/UX Design</p>
              <p className="text-[#8b6f47]">📱 Responsive Layouts</p>
            </div>
            <div>
              <p className="text-[#8b6f47]">✨ Smooth Animations</p>
              <p className="text-[#8b6f47]">⚡ Performance Optimization</p>
            </div>
          </div>
        </section>
      </div>
    ),
  },
  games: {
    title: 'GAMES.EXE',
    icon: '🎮',
    position: { x: 420, y: 120 },
    content: (
      <div className="h-full p-6" style={{
        background: 'linear-gradient(180deg, rgba(248,240,223,0.95) 0%, rgba(255,255,255,0.9) 55%, rgba(249,237,218,0.95) 100%)',
      }}>
        {/* Retro Header */}
        <div className="mb-6 text-center relative">
          <div className="inline-block relative">
            <h2 className="font-pixel text-[18px] uppercase tracking-[0.4em] text-[#5d4e37] mb-2 relative z-10">
              ◊ PIXEL ARCADE ◊
            </h2>
            <div className="absolute inset-0 bg-[#d4a574]/20 blur-md rounded-lg"></div>
          </div>
          <p className="text-[11px] text-[#8b6f47] font-pixel-content">
            › SELECT YOUR RETRO ADVENTURE ‹
          </p>
        </div>

        {/* 3-Column Games Grid */}
        <div className="grid grid-cols-3 gap-4 h-[260px]">
          {/* Snake Game */}
          <div
            onClick={() => window.open('https://playsnake.org/', '_blank')}
            className="group relative overflow-hidden rounded-lg border-2 border-[#d0c4b0] bg-white/90 shadow-[4px_4px_0_0_rgba(139,111,71,0.2)] hover:shadow-[6px_6px_0_0_rgba(139,111,71,0.4)] transition-all duration-300 cursor-pointer hover:scale-[1.03] active:scale-[0.98]"
          >
            {/* Pixel Art Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `
                linear-gradient(45deg, #22c55e 25%, transparent 25%),
                linear-gradient(-45deg, #22c55e 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, #22c55e 75%),
                linear-gradient(-45deg, transparent 75%, #22c55e 75%)
              `,
              backgroundSize: '8px 8px',
              backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px'
            }}></div>

            <div className="relative h-full p-4 flex flex-col justify-between">
              <div className="text-center">
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-200">🐍</div>
                <h3 className="font-pixel text-[12px] uppercase tracking-[0.2em] text-[#5d4e37] mb-2">
                  SNAKE
                </h3>
                <p className="text-[9px] text-[#8b6f47] font-pixel-content leading-relaxed">
                  Classic serpent navigation with pixel-perfect controls
                </p>
              </div>


              <div className="text-center">
                <div className="text-[8px] text-[#a7886f] font-pixel mb-2">⌨️ ARROW KEYS</div>
                <div className="inline-block px-2 py-1 bg-[#22c55e]/20 border border-[#22c55e]/40 rounded text-[9px] font-pixel text-[#5d4e37] group-hover:bg-[#22c55e]/30 transition-colors duration-200">
                  ▶ PLAY
                </div>
              </div>
            </div>
          </div>

          {/* Pong Game */}
          <div
            onClick={() => window.open('https://ponggame.org/', '_blank')}
            className="group relative overflow-hidden rounded-lg border-2 border-[#d0c4b0] bg-white/90 shadow-[4px_4px_0_0_rgba(139,111,71,0.2)] hover:shadow-[6px_6px_0_0_rgba(139,111,71,0.4)] transition-all duration-300 cursor-pointer hover:scale-[1.03] active:scale-[0.98]"
          >
            {/* Pixel Art Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `
                linear-gradient(45deg, #3b82f6 25%, transparent 25%),
                linear-gradient(-45deg, #3b82f6 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, #3b82f6 75%),
                linear-gradient(-45deg, transparent 75%, #3b82f6 75%)
              `,
              backgroundSize: '6px 6px',
              backgroundPosition: '0 0, 0 3px, 3px -3px, -3px 0px'
            }}></div>

            <div className="relative h-full p-4 flex flex-col justify-between">
              <div className="text-center">
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-200">🏓</div>
                <h3 className="font-pixel text-[12px] uppercase tracking-[0.2em] text-[#5d4e37] mb-2">
                  PONG
                </h3>
                <p className="text-[9px] text-[#8b6f47] font-pixel-content leading-relaxed">
                  Retro table tennis with authentic CRT feel
                </p>
              </div>

              <div className="text-center">
                <div className="text-[8px] text-[#a7886f] font-pixel mb-2">🖱️ MOUSE</div>
                <div className="inline-block px-2 py-1 bg-[#3b82f6]/20 border border-[#3b82f6]/40 rounded text-[9px] font-pixel text-[#5d4e37] group-hover:bg-[#3b82f6]/30 transition-colors duration-200">
                  ▶ PLAY
                </div>
              </div>
            </div>
          </div>

          {/* Tetris Game */}
          <div
            onClick={() => window.open('https://tetris.com/play-tetris/', '_blank')}
            className="group relative overflow-hidden rounded-lg border-2 border-[#d0c4b0] bg-white/90 shadow-[4px_4px_0_0_rgba(139,111,71,0.2)] hover:shadow-[6px_6px_0_0_rgba(139,111,71,0.4)] transition-all duration-300 cursor-pointer hover:scale-[1.03] active:scale-[0.98]"
          >
            {/* Pixel Art Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: `
                linear-gradient(45deg, #ec4899 25%, transparent 25%),
                linear-gradient(-45deg, #ec4899 25%, transparent 25%),
                linear-gradient(45deg, transparent 75%, #ec4899 75%),
                linear-gradient(-45deg, transparent 75%, #ec4899 75%)
              `,
              backgroundSize: '10px 10px',
              backgroundPosition: '0 0, 0 5px, 5px -5px, -5px 0px'
            }}></div>

            <div className="relative h-full p-4 flex flex-col justify-between">
              <div className="text-center">
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-200">🧩</div>
                <h3 className="font-pixel text-[12px] uppercase tracking-[0.2em] text-[#5d4e37] mb-2">
                  TETRIS
                </h3>
                <p className="text-[9px] text-[#8b6f47] font-pixel-content leading-relaxed">
                  Stack blocks and clear lines in this puzzle classic
                </p>
              </div>

              <div className="text-center">
                <div className="text-[8px] text-[#a7886f] font-pixel mb-2">⌨️ ROTATIONS</div>
                <div className="inline-block px-2 py-1 bg-[#ec4899]/20 border border-[#ec4899]/40 rounded text-[9px] font-pixel text-[#5d4e37] group-hover:bg-[#ec4899]/30 transition-colors duration-200">
                  ▶ PLAY
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Retro Footer */}
        <div className="mt-6 text-center relative">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-[#d4a574]">◆</span>
            <span className="text-[9px] text-[#8b6f47] font-pixel uppercase tracking-[0.2em]">ARCADE STATUS: ONLINE</span>
            <span className="text-[#d4a574]">◆</span>
          </div>
          <p className="text-[8px] text-[#a7886f] font-pixel-content opacity-75">
            › GAMES OPEN IN NEW TABS • NO DOWNLOADS REQUIRED ‹
          </p>
        </div>
      </div>
    ),
  },
  documents: {
    title: 'DOCUMENTS.DIR',
    icon: '📁',
    position: { x: 400, y: 160 },
    content: (
      <div className="space-y-6 text-left font-pixel-content text-[14px] leading-[1.8] tracking-[0.01em] text-[#433222]">
        <section className="rounded-lg border-2 border-[#d0c4b0] bg-white/95 p-5 shadow-[4px_4px_0_0_rgba(139,111,71,0.2)]">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">📂</span>
            <div>
              <h3 className="font-pixel text-[11px] uppercase tracking-[0.3em] text-[#7c6544]">
                Document Archive
              </h3>
              <p className="text-[12px] text-[#8b6f47] mt-1">Files, photos & official documents</p>
            </div>
          </div>
          <p className="text-[13px] leading-relaxed">
            Collection of important documents, photos, and files. Click any item to view or download.
          </p>
        </section>

        <section className="space-y-4">
          {/* Resume PDF */}
          <div className="bg-white/95 rounded-lg border-2 border-[#d0c4b0] p-5 shadow-[3px_3px_0_0_rgba(139,111,71,0.2)] hover:shadow-[4px_4px_0_0_rgba(139,111,71,0.3)] transition-all duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-xl">📄</span>
                <div>
                  <h4 className="font-pixel text-[12px] uppercase tracking-[0.2em] text-[#5d4e37] mb-1">ErenDemir.pdf</h4>
                  <p className="text-[11px] text-[#8b6f47]">Complete Resume & CV</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="/files/ErenDemir.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-gradient-to-r from-[#7ba7bc] to-[#9fbec8] text-white text-[10px] font-pixel uppercase tracking-[0.1em] rounded-full shadow-sm hover:scale-105 transition-transform duration-200"
                >
                  View PDF
                </a>
                <a
                  href="/files/ErenDemir.pdf"
                  download="ErenDemir_Resume.pdf"
                  className="px-3 py-1.5 bg-gradient-to-r from-[#a8b5a0] to-[#bcc9b4] text-white text-[10px] font-pixel uppercase tracking-[0.1em] rounded-full shadow-sm hover:scale-105 transition-transform duration-200"
                >
                  Download
                </a>
              </div>
            </div>
            <p className="text-[12px] text-[#8b6f47] leading-relaxed">
              Full professional resume with detailed experience, education, and technical skills.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-2 py-1 bg-[#faf3e5] border border-[#e5d8c6] rounded-md text-[9px] text-[#8b6f47]">PDF</span>
              <span className="px-2 py-1 bg-[#faf3e5] border border-[#e5d8c6] rounded-md text-[9px] text-[#8b6f47]">Professional</span>
              <span className="px-2 py-1 bg-[#faf3e5] border border-[#e5d8c6] rounded-md text-[9px] text-[#8b6f47]">Downloadable</span>
            </div>
          </div>

          {/* Corgi Photo */}
          <div className="bg-white/95 rounded-lg border-2 border-[#d0c4b0] p-5 shadow-[3px_3px_0_0_rgba(139,111,71,0.2)] hover:shadow-[4px_4px_0_0_rgba(139,111,71,0.3)] transition-all duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-xl">🐕</span>
                <div>
                  <h4 className="font-pixel text-[12px] uppercase tracking-[0.2em] text-[#5d4e37] mb-1">Corgis.png</h4>
                  <p className="text-[11px] text-[#8b6f47]">Personal Photo Collection</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="/files/Corgis.png"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-gradient-to-r from-[#d4a574] to-[#e3b888] text-white text-[10px] font-pixel uppercase tracking-[0.1em] rounded-full shadow-sm hover:scale-105 transition-transform duration-200"
                >
                  View Image
                </a>
                <a
                  href="/files/Corgis.png"
                  download="Eren_Corgis.png"
                  className="px-3 py-1.5 bg-gradient-to-r from-[#a8b5a0] to-[#bcc9b4] text-white text-[10px] font-pixel uppercase tracking-[0.1em] rounded-full shadow-sm hover:scale-105 transition-transform duration-200"
                >
                  Download
                </a>
              </div>
            </div>
            <p className="text-[12px] text-[#8b6f47] leading-relaxed">
              A fun photo from my adventures - because who doesn't love corgis? 🐕
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-2 py-1 bg-[#faf3e5] border border-[#e5d8c6] rounded-md text-[9px] text-[#8b6f47]">PNG</span>
              <span className="px-2 py-1 bg-[#faf3e5] border border-[#e5d8c6] rounded-md text-[9px] text-[#8b6f47]">Personal</span>
              <span className="px-2 py-1 bg-[#faf3e5] border border-[#e5d8c6] rounded-md text-[9px] text-[#8b6f47]">Fun</span>
            </div>
          </div>

          {/* Pixel Portrait */}
          <div className="bg-white/95 rounded-lg border-2 border-[#d0c4b0] p-5 shadow-[3px_3px_0_0_rgba(139,111,71,0.2)] hover:shadow-[4px_4px_0_0_rgba(139,111,71,0.3)] transition-all duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-xl">🎨</span>
                <div>
                  <h4 className="font-pixel text-[12px] uppercase tracking-[0.2em] text-[#5d4e37] mb-1">PixelMe.jpg</h4>
                  <p className="text-[11px] text-[#8b6f47]">Pixel Art Portrait</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="/PixelMe.jpg"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-gradient-to-r from-[#b5a7d6] to-[#c9bfe0] text-white text-[10px] font-pixel uppercase tracking-[0.1em] rounded-full shadow-sm hover:scale-105 transition-transform duration-200"
                >
                  View Image
                </a>
                <a
                  href="/PixelMe.jpg"
                  download="Eren_PixelPortrait.jpg"
                  className="px-3 py-1.5 bg-gradient-to-r from-[#a8b5a0] to-[#bcc9b4] text-white text-[10px] font-pixel uppercase tracking-[0.1em] rounded-full shadow-sm hover:scale-105 transition-transform duration-200"
                >
                  Download
                </a>
              </div>
            </div>
            <p className="text-[12px] text-[#8b6f47] leading-relaxed">
              Custom pixel art portrait used throughout the portfolio interface.
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-2 py-1 bg-[#faf3e5] border border-[#e5d8c6] rounded-md text-[9px] text-[#8b6f47]">JPG</span>
              <span className="px-2 py-1 bg-[#faf3e5] border border-[#e5d8c6] rounded-md text-[9px] text-[#8b6f47]">Pixel Art</span>
              <span className="px-2 py-1 bg-[#faf3e5] border border-[#e5d8c6] rounded-md text-[9px] text-[#8b6f47]">Portrait</span>
            </div>
          </div>
        </section>

        <section className="rounded-lg border-2 border-[#d0c4b0] bg-[#faf3e5]/85 p-4 shadow-[4px_4px_0_0_rgba(139,111,71,0.15)]">
          <h4 className="font-pixel text-[11px] uppercase tracking-[0.3em] text-[#7c6544] mb-3">
            File Information
          </h4>
          <div className="grid grid-cols-2 gap-3 text-[12px]">
            <div>
              <p className="text-[#8b6f47]">📄 Documents: 1 PDF</p>
              <p className="text-[#8b6f47]">🖼️ Images: 1 PNG, 1 JPG</p>
            </div>
            <div>
              <p className="text-[#8b6f47]">💾 Total Size: ~1MB</p>
              <p className="text-[#8b6f47]">🔒 All files safe to download</p>
            </div>
          </div>
        </section>
      </div>
    ),
  },
  music: {
    title: 'LOFI_CAFE.EXE',
    icon: '🎵',
    position: { x: 200, y: 80 },
    content: <SimpleMusicPlayer />,
    size: { width: 500, height: 600 }
  },
}

type DesktopShortcut = {
  id: WindowId
  label: string
  icon: string
  description: string
  position: { x: number; y: number }
}

const DESKTOP_SHORTCUTS: DesktopShortcut[] = [
  {
    id: 'about',
    label: 'ABOUT ME',
    icon: '👤',
    description: 'Personal info and background',
    position: { x: 80, y: 120 }
  },
  {
    id: 'projects',
    label: 'PROJECTS',
    icon: '💼',
    description: 'Portfolio and work samples',
    position: { x: 80, y: 240 }
  },
  {
    id: 'terminal',
    label: 'TERMINAL',
    icon: '💻',
    description: 'Interactive command line',
    position: { x: 80, y: 360 }
  },
  {
    id: 'websites',
    label: 'WEBSITES',
    icon: '🌐',
    description: 'Frontend showcase',
    position: { x: 80, y: 480 }
  },
  {
    id: 'resume',
    label: 'RESUME',
    icon: '📄',
    description: 'Professional experience',
    position: { x: 80, y: 600 }
  },
  {
    id: 'contact',
    label: 'CONTACT',
    icon: '📧',
    description: 'Get in touch',
    position: { x: 80, y: 720 }
  },
  {
    id: 'games',
    label: 'GAMES',
    icon: '🎮',
    description: 'Retro arcade games',
    position: { x: 80, y: 840 }
  },
  {
    id: 'music',
    label: 'MUSIC',
    icon: '🎵',
    description: 'Vinyl music player',
    position: { x: 200, y: 120 }
  }
]

// Responsive icon positioning function
const getResponsiveIconPosition = (shortcut: DesktopShortcut, screenWidth: number, allShortcuts: DesktopShortcut[]) => {
  const isMobile = screenWidth < 768
  const isTablet = screenWidth < 1024
  const isRightSide = shortcut.position.x > 600 // Original right-side icons

  if (isMobile) {
    // Mobile: Single column centered
    const leftSideIcons = allShortcuts.filter(s => s.position.x <= 600)
    const rightSideIcons = allShortcuts.filter(s => s.position.x > 600)
    const allIcons = [...leftSideIcons, ...rightSideIcons]
    const index = allIcons.findIndex(s => s.id === shortcut.id)

    return {
      x: Math.max(20, (screenWidth - 80) / 2), // Adjusted for smaller mobile icons
      y: 60 + (index * 100) // Reduced spacing for mobile
    }
  } else if (isTablet) {
    // Tablet: Two columns, closer to edges
    const sideIcons = isRightSide
      ? allShortcuts.filter(s => s.position.x > 600)
      : allShortcuts.filter(s => s.position.x <= 600)
    const index = sideIcons.findIndex(s => s.id === shortcut.id)

    return {
      x: isRightSide ? Math.max(screenWidth - 150, screenWidth - 200) : 40,
      y: 80 + (index * 120)
    }
  } else {
    // Desktop: Original positions, but make sure they fit on screen
    return {
      x: Math.min(shortcut.position.x, screenWidth - 120),
      y: shortcut.position.y
    }
  }
}

const START_MENU_ITEMS = [
  ...DESKTOP_SHORTCUTS.map(({ id, label, icon, description }) => ({
    id,
    label,
    icon,
    description,
    onClick: () => {}, // Will be set in component
  })),
  // Special Documents section - only in start menu
  {
    id: 'documents',
    label: 'DOCUMENTS',
    icon: '📁',
    description: 'Files, photos & downloads',
    onClick: () => {}, // Will be set in component
  },
  {
    id: 'music',
    label: 'MUSIC PLAYER',
    icon: '🎵',
    description: 'Vinyl lo-fi lounge',
    onClick: () => {}, // Will be set in component
  }
]

const ICON_DIMENSIONS = {
  width: 96,
  height: 96,
}

const WINDOW_DIMENSIONS = {
  width: 420,
  height: 340,
}

const START_MENU_ORIGIN = { x: 96, y: 440 }

const Desktop = () => {
  const [time, setTime] = useState(new Date())
  const [selectedShortcut, setSelectedShortcut] = useState<WindowId | null>(null)
  const [isStartOpen, setIsStartOpen] = useState(false)
  const [windowOrigins, setWindowOrigins] = useState<WindowOriginMap>({})
  const [windowPositions, setWindowPositions] = useState<WindowPositionMap>(() => ({
    about: WINDOW_CONFIG.about.position,
  }))
  const [openWindows, setOpenWindows] = useState<WindowId[]>(['about'])
  const [maximizedWindows, setMaximizedWindows] = useState<Set<WindowId>>(new Set())
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 })
  const { playSound, playMusic, isLoaded } = useSoundContext()

  // Handle responsive screen size changes
  useEffect(() => {
    const updateScreenSize = () => {
      setScreenSize({ width: window.innerWidth, height: window.innerHeight })
    }

    updateScreenSize()
    window.addEventListener('resize', updateScreenSize)
    return () => window.removeEventListener('resize', updateScreenSize)
  }, [])

  // Start desktop music when component mounts
  useEffect(() => {
    if (isLoaded) {
      // Add a slight delay to let the boot sequence finish
      const timer = setTimeout(() => {
        playMusic('desktopMusic')
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isLoaded, playMusic])

  const handleStartToggle = () => {
    setIsStartOpen((previous) => !previous)
    playSound('click')
  }

  useEffect(() => {
    const timer = window.setInterval(() => setTime(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const timeLabel = useMemo(
    () =>
      time.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    [time]
  )

  const focusWindow = (id: WindowId) => {
    setOpenWindows((previous) => {
      if (previous[previous.length - 1] === id) {
        return previous
      }
      const withoutId = previous.filter((windowId) => windowId !== id)
      return [...withoutId, id]
    })

    // On mobile, scroll to bring window into view
    const isMobile = screenSize.width < 768
    if (isMobile && windowPositions[id]) {
      const windowY = windowPositions[id].y
      const scrollContainer = document.querySelector('.desktop-scroll')
      if (scrollContainer) {
        scrollContainer.scrollTo({
          top: Math.max(0, windowY - 50),
          behavior: 'smooth'
        })
      }
    }
  }

  const openWindow = (id: WindowId, origin?: { x: number; y: number }) => {
    const alreadyOpen = openWindows.includes(id)
    const isMobile = screenSize.width < 768

    if (origin && !alreadyOpen) {
      setWindowOrigins((previous) => ({
        ...previous,
        [id]: origin,
      }))

      if (typeof window !== 'undefined') {
        window.setTimeout(() => {
          setWindowOrigins((previous) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { [id]: _, ...rest } = previous
            return rest
          })
        }, 360)
      }
    }

    if (!alreadyOpen && !windowPositions[id]) {
      // On mobile, center windows and position them higher
      const mobilePosition = isMobile
        ? { x: Math.max(10, (screenSize.width - 520) / 2), y: 20 }
        : WINDOW_CONFIG[id].position

      setWindowPositions((previous) => ({
        ...previous,
        [id]: mobilePosition,
      }))
    }

    setIsStartOpen(false)
    setOpenWindows((previous) => {
      if (previous.includes(id)) {
        return [...previous.filter((windowId) => windowId !== id), id]
      }
      return [...previous, id]
    })

    // Play sound effect
    if (!alreadyOpen) {
      playSound('open')
    } else {
      playSound('click')
    }
  }

  const closeWindow = (id: WindowId) => {
    setOpenWindows((previous) => previous.filter((windowId) => windowId !== id))
    setWindowOrigins((previous) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [id]: _, ...rest } = previous
      return rest
    })
    setMaximizedWindows((previous) => {
      const newSet = new Set(previous)
      newSet.delete(id)
      return newSet
    })
    playSound('close')
  }

  const toggleWindowMaximize = (id: WindowId) => {
    setMaximizedWindows((previous) => {
      const newSet = new Set(previous)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const handleShortcutActivate = (shortcut: (typeof DESKTOP_SHORTCUTS)[number]) => {
    const origin = {
      x: Math.max(
        0,
        shortcut.position.x + ICON_DIMENSIONS.width / 2 - WINDOW_DIMENSIONS.width / 2,
      ),
      y: Math.max(
        0,
        shortcut.position.y + ICON_DIMENSIONS.height / 2 - WINDOW_DIMENSIONS.height / 2,
      ),
    }
    openWindow(shortcut.id, origin)
  }

  const handleShortcutSelect = (id: WindowId) => {
    setSelectedShortcut(id)
    setIsStartOpen(false)
    playSound('click')
  }

  const handleDesktopMouseDown = (event: ReactMouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement
    const interactedWithTaskbar = target.closest('[data-role="taskbar"]') !== null
    const interactedWithStartMenu = target.closest('[data-role="start-menu"]') !== null
    const interactedWithIcon = target.closest('[data-role="desktop-icon"]') !== null

    if (!interactedWithTaskbar && !interactedWithStartMenu) {
      setIsStartOpen(false)
    }

    if (!interactedWithIcon) {
      setSelectedShortcut(null)
    }
  }

  const handleWindowDragEnd = (id: WindowId, nextPosition: { x: number; y: number }) => {
    setWindowPositions((previous) => ({
      ...previous,
      [id]: nextPosition,
    }))
    focusWindow(id)
  }

  const taskbarApps: TaskbarApp[] = openWindows.map((id) => {
    const config = WINDOW_CONFIG[id]
    const isActive = openWindows[openWindows.length - 1] === id
    return {
      id,
      label: config.title,
      icon: config.icon,
      isActive,
      onClick: () => focusWindow(id),
    }
  })

  const startMenuItems = START_MENU_ITEMS.map((item) => ({
    ...item,
    onClick: () => openWindow(item.id as WindowId, START_MENU_ORIGIN),
  }))

  return (
    <div
      className="relative h-screen w-screen font-pixel touch-manipulation desktop-scroll"
      style={{
        backgroundColor: '#faf7f0',
        color: '#5d4e37',
        backgroundImage: 'url(/wallpapers/cozy-pixel.svg)',
        backgroundSize: 'clamp(200px, 50vw, 400px) clamp(150px, 37.5vw, 300px)',
        backgroundRepeat: 'repeat',
        // Enable mobile scrolling while keeping desktop experience
        overflow: screenSize.width < 768 ? 'auto' : 'hidden',
        // Add smooth scrolling for mobile
        scrollBehavior: 'smooth',
        WebkitOverflowScrolling: 'touch'
      }}
      onMouseDown={handleDesktopMouseDown}
      onTouchStart={(e) => handleDesktopMouseDown(e as unknown as ReactMouseEvent<HTMLDivElement>)}
    >
      <Wallpaper />

      <div
        className="relative z-10 flex flex-col"
        style={{
          // On mobile, allow content to be taller than screen to enable scrolling
          minHeight: screenSize.width < 768 ? 'calc(100vh + 400px)' : '100vh',
          height: screenSize.width < 768 ? 'auto' : '100vh'
        }}
      >
         <div
           className="relative"
           style={{
             flex: screenSize.width < 768 ? 'none' : '1',
             minHeight: screenSize.width < 768 ? 'calc(100vh + 350px)' : 'auto',
             // Add padding bottom on mobile to account for fixed taskbar
             paddingBottom: screenSize.width < 768 ? '80px' : '0'
           }}
         >
           <div className="absolute inset-0">
             {/* Desktop Icons - Responsive positioned */}
             {DESKTOP_SHORTCUTS.map((shortcut) => {
               const responsivePosition = getResponsiveIconPosition(shortcut, screenSize.width, DESKTOP_SHORTCUTS)

               return (
                 <div
                   key={shortcut.id}
                   className="absolute transition-all duration-300 ease-out"
                   style={{
                     left: `${responsivePosition.x}px`,
                     top: `${responsivePosition.y}px`
                   }}
                 >
                   <DesktopIcon
                     icon={shortcut.icon}
                     label={shortcut.label}
                     isActive={selectedShortcut === shortcut.id}
                     onSelect={() => handleShortcutSelect(shortcut.id)}
                     onActivate={() => handleShortcutActivate(shortcut)}
                   />
                 </div>
               )
             })}

            <AnimatePresence>
              {openWindows.map((id) => {
                const config = WINDOW_CONFIG[id]
                const isFocused = openWindows[openWindows.length - 1] === id
                const currentPosition = windowPositions[id] ?? config.position
                const isMaximizable = ['about', 'resume'].includes(id) // Only About Me and Resume can be maximized
                const isMaximized = isMaximizable ? maximizedWindows.has(id) : true // Non-maximizable windows are always "maximized"

                return (
                  <DesktopWindow
                    key={id}
                    title={config.title}
                    icon={config.icon}
                    position={currentPosition}
                    isFocused={isFocused}
                    onClose={() => closeWindow(id)}
                    onFocus={() => focusWindow(id)}
                    origin={windowOrigins[id]}
                    onDragEnd={(next) => handleWindowDragEnd(id, next)}
                    isMaximized={isMaximized}
                    onToggleMaximize={isMaximizable ? () => toggleWindowMaximize(id) : undefined}
                  >
                    {config.content}
                  </DesktopWindow>
                )
              })}
            </AnimatePresence>
          </div>
        </div>

        <div
          className="relative"
          style={{
            // On mobile, make taskbar fixed at bottom of screen
            position: screenSize.width < 768 ? 'fixed' : 'relative',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 50
          }}
        >
          <Taskbar
            timeLabel={timeLabel}
            isStartOpen={isStartOpen}
            onToggleStart={handleStartToggle}
            apps={taskbarApps}
          />
          <NewStartMenu 
            isOpen={isStartOpen}
            onClose={() => setIsStartOpen(false)}
            menuItems={startMenuItems}
          />
        </div>
      </div>

      {/* Sound Controls */}
      <SoundControls />

      {/* Mini Music Player - appears when music is playing */}
      <MiniMusicPlayer />

    </div>
  )
}

export default Desktop
