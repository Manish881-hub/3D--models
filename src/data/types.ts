/* ============================================
   NRG Bridge Power Solution - Type Definitions
   ============================================ */

export interface PhaseScreen {
  type: 'intro' | 'nodes' | 'exit'
  badge?: string
  phaseTitle?: string[]
  large?: string
  screenSummary?: string
  button?: string
  frame?: number[]
  media?: string
  isTour?: boolean
  nodes?: NodeConfig[]
  pageLoad?: string
}

export interface NodeConfig {
  id: string
  title: string
  x: number
  y: number
  deepDive?: string
  tourLocation?: string
  panel?: HTMLElement | null
  el?: HTMLElement | null
}

export interface Phase {
  id: number
  type: 'explore' | 'scroll' | 'horizontal'
  title: string
  subtitle: string
  media?: string
  screens: PhaseScreen[]
  color?: string
}

export interface DeepDiveBlock {
  type: 'textblock' | 'midParagraph' | 'nodeDotPoint' | 'table' | 'accordion' | 'contact'
  title?: string
  content?: string
  items?: Array<{ label: string; value: string }>
}

export interface DeepDive {
  id: string
  title: string
  intro: string
  color: string
  blocks: DeepDiveBlock[]
  pageLoad?: string
}

export interface MediaItem {
  id: string
  type: 'video' | 'imageSequence'
  src?: [string, string]
  srcs?: [string, string][]
  el?: HTMLElement | null
  video?: HTMLVideoElement | null
  imgs?: HTMLImageElement[]
  loaded?: boolean
  loading?: boolean
  added?: boolean
  isPlaying?: boolean
  inLoop?: boolean
  loop?: ((time?: number) => void) | null
}

export interface ContentData {
  phases: Phase[]
  media: MediaItem[]
  deepDives: Record<string, DeepDive>
  tour: Record<string, TourItem>
}

export interface TourItem {
  media: string
  frames: number[]
  blocks: DeepDiveBlock[]
  pageLoad?: string
}

export interface BoardImage {
  id: string
  name: string
  filename: string
  description: string
}

export interface PhaseData {
  phase: number
  title: string
  subtitle: string
  description: string
  boardImages: BoardImage[]
  color: string
}
