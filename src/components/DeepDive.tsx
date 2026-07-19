import { useEffect, useRef } from 'react'
import { DEEP_DIVES, BOARD_IMAGES } from '../data/content'

interface DeepDiveProps {
  id: string | null
  onClose: () => void
}

export default function DeepDive({ id, onClose }: DeepDiveProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const isOpen = id !== null

  // Find deep dive content by board image id or key
  const content = id ? DEEP_DIVES[id] || getContentFromBoard(id) : null

  // Close on escape key
  useEffect(() => {
    if (!isOpen) return

    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  // Close on background click
  function handleBackgroundClick(e: React.MouseEvent) {
    if (e.target === overlayRef.current) {
      onClose()
    }
  }

  if (!content) return null

  return (
    <div
      className={`deepDive ${isOpen ? 'active' : ''}`}
      ref={overlayRef}
      onClick={handleBackgroundClick}
      id="deep-dive"
    >
      <div className="deepDive__inner" tabIndex={0}>
        <div className="deepDive__main">
          {/* Color background */}
          <div className="deepDive__color" style={{ backgroundColor: content.color }} />

          {/* Close button */}
          <div className="deepDive__close" onClick={onClose} tabIndex={0} role="button" aria-label="Close">
            <span />
          </div>

          {/* Title */}
          <h2 className="deepDive__title">{content.title}</h2>

          {/* Intro */}
          <p className="deepDive__intro">{content.intro}</p>

          {/* Content blocks */}
          {content.blocks.map((block, i) => (
            <div key={i} style={{ marginBottom: '2.5rem' }}>
              {block.type === 'textblock' && (
                <div>
                  {block.title && (
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      marginBottom: '0.75rem',
                      color: 'var(--color-white)',
                    }}>
                      {block.title}
                    </h3>
                  )}
                  {block.content && (
                    <p style={{
                      fontSize: '1.05rem',
                      lineHeight: 1.5,
                      color: 'rgba(255,255,255,0.85)',
                      maxWidth: '45rem',
                    }}>
                      {block.content}
                    </p>
                  )}
                </div>
              )}

              {block.type === 'table' && block.items && (
                <div>
                  {block.title && (
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: 700,
                      marginBottom: '1.5rem',
                      color: 'var(--color-white)',
                    }}>
                      {block.title}
                    </h3>
                  )}
                  {block.items.map((item, j) => (
                    <div
                      key={j}
                      style={{
                        borderTop: '1px dashed rgba(255,255,255,0.15)',
                        padding: '1.2rem 0.7rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '1rem',
                        color: 'var(--color-white)',
                      }}
                    >
                      <span style={{ fontWeight: 500 }}>{item.label}</span>
                      <span style={{ textAlign: 'right', opacity: 0.8 }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Fallback: generate deep dive content from board image data
function getContentFromBoard(id: string) {
  const board = BOARD_IMAGES.find(b => b.id === id)
  if (!board) return null

  return {
    title: board.name.replace(/_/g, ' '),
    intro: board.description,
    color: '#261d26',
    blocks: [
      {
        type: 'textblock' as const,
        title: 'Overview',
        content: `This phase involves ${board.description.toLowerCase()}. NRG manages all aspects of this process to ensure timely delivery and regulatory compliance.`,
      },
      {
        type: 'textblock' as const,
        title: 'Key Activities',
        content: 'Our team coordinates with local authorities, contractors, and stakeholders to ensure smooth execution of all required activities during this phase.',
      },
    ],
  }
}
