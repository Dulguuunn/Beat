'use client'

import { cn } from '@/lib/utils'

// Deterministic pseudo-random so SSR and client render identically.
// Rounded to fixed precision to avoid float-formatting hydration mismatches.
function seeded(seed: number, i: number) {
  const x = Math.sin(seed * 999 + i * 12.9898) * 43758.5453
  return Math.round((x - Math.floor(x)) * 1000) / 1000
}

export function Equalizer({
  bars = 5,
  active = true,
  className,
  color = 'cyan',
}: {
  bars?: number
  active?: boolean
  className?: string
  color?: 'cyan' | 'magenta'
}) {
  return (
    <div className={cn('flex items-end gap-[3px]', className)} aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className={cn(
            'w-[3px] flex-1 origin-bottom rounded-full',
            color === 'cyan' ? 'bg-neon-cyan' : 'bg-neon-magenta',
          )}
          style={{
            height: '100%',
            animation: active ? `eq-bounce ${0.7 + seeded(1, i) * 0.9}s ease-in-out ${seeded(2, i) * -1}s infinite` : undefined,
            transform: active ? undefined : 'scaleY(0.2)',
            opacity: active ? 1 : 0.4,
          }}
        />
      ))}
    </div>
  )
}

export function Waveform({
  seed = 1,
  bars = 56,
  progress = 0,
  active = false,
  color = 'cyan',
  className,
}: {
  seed?: number
  bars?: number
  progress?: number // 0..1
  active?: boolean
  color?: 'cyan' | 'magenta'
  className?: string
}) {
  const activeColor = color === 'cyan' ? 'bg-neon-cyan' : 'bg-neon-magenta'
  return (
    <div className={cn('flex h-full w-full items-center gap-[2px]', className)} aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => {
        const h = Math.round((12 + seeded(seed, i) * 88) * 100) / 100
        const played = i / bars <= progress
        return (
          <span
            key={i}
            className={cn(
              'w-full min-w-[2px] rounded-full transition-colors duration-150',
              played ? activeColor : 'bg-foreground/15',
              active && played && (color === 'cyan' ? 'shadow-[0_0_8px_var(--neon-cyan)]' : 'shadow-[0_0_8px_var(--neon-magenta)]'),
            )}
            style={{ height: `${h}%` }}
          />
        )
      })}
    </div>
  )
}
