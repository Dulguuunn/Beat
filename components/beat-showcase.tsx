'use client'

import { useEffect, useRef, useState } from 'react'
import { Play, Pause, Download } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Waveform } from '@/components/audio-visuals'
import { cn } from '@/lib/utils'

type Beat = {
  id: string
  title: string
  genre: string
  bpm: number
  key: string
  duration: number // seconds
  color: 'cyan' | 'magenta'
  seed: number
}

const beats: Beat[] = [
  { id: 'b1', title: 'Midnight Knock', genre: 'Trap', bpm: 140, key: 'C Minor', duration: 38, color: 'cyan', seed: 21 },
  { id: 'b2', title: 'Neon Alley', genre: 'Drill', bpm: 144, key: 'F# Minor', duration: 44, color: 'magenta', seed: 34 },
  { id: 'b3', title: 'Soft Static', genre: 'Lo-Fi', bpm: 82, key: 'A Minor', duration: 52, color: 'cyan', seed: 45 },
  { id: 'b4', title: 'Voltage', genre: 'Hyperpop', bpm: 160, key: 'G Major', duration: 33, color: 'magenta', seed: 58 },
  { id: 'b5', title: 'Deep Current', genre: 'House', bpm: 124, key: 'D Minor', duration: 48, color: 'cyan', seed: 63 },
  { id: 'b6', title: 'Afterglow', genre: 'R&B', bpm: 96, key: 'E Major', duration: 41, color: 'magenta', seed: 72 },
]

function fmt(s: number) {
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

function BeatCard({ beat }: { beat: Beat }) {
  const [playing, setPlaying] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const ref = useRef<number | null>(null)

  useEffect(() => {
    if (playing) {
      ref.current = window.setInterval(() => {
        setElapsed((e) => {
          if (e + 0.1 >= beat.duration) {
            setPlaying(false)
            return 0
          }
          return e + 0.1
        })
      }, 100)
    }
    return () => {
      if (ref.current) window.clearInterval(ref.current)
    }
  }, [playing, beat.duration])

  const progress = elapsed / beat.duration
  const isCyan = beat.color === 'cyan'

  return (
    <Card className="group/beat gap-4 p-4 ring-1 ring-border transition-colors hover:ring-foreground/20">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-semibold leading-tight">{beat.title}</h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Badge
              variant="outline"
              className={cn(
                'border-transparent',
                isCyan ? 'bg-neon-cyan/10 text-neon-cyan' : 'bg-neon-magenta/10 text-neon-magenta',
              )}
            >
              {beat.genre}
            </Badge>
            <Badge variant="outline" className="border-border text-muted-foreground">
              {beat.bpm} BPM
            </Badge>
            <Badge variant="outline" className="border-border text-muted-foreground">
              {beat.key}
            </Badge>
          </div>
        </div>
        <Button
          size="icon-lg"
          aria-label={playing ? `Pause ${beat.title}` : `Play ${beat.title}`}
          onClick={() => setPlaying((p) => !p)}
          className={cn(
            'size-11 shrink-0 rounded-full text-primary-foreground',
            isCyan
              ? 'bg-neon-cyan shadow-glow-cyan hover:bg-neon-cyan/90'
              : 'bg-neon-magenta shadow-glow-magenta hover:bg-neon-magenta/90',
          )}
        >
          {playing ? <Pause className="size-5" /> : <Play className="size-5" />}
        </Button>
      </div>

      <div className="h-14 w-full rounded-lg bg-background/40 p-2">
        <Waveform seed={beat.seed} bars={48} progress={progress} active={playing} color={beat.color} />
      </div>

      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-muted-foreground tabular-nums">
          {fmt(elapsed)} / {fmt(beat.duration)}
        </span>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          <Download className="size-3.5" />
          Preview stem
        </Button>
      </div>
    </Card>
  )
}

export function BeatShowcase() {
  return (
    <section id="beats" className="relative scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-neon-cyan">Portfolio</p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-balance md:text-4xl">
            Produced Stems & Demo Beats
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            Real beats made using the exact techniques taught in the course. Hit play,
            watch the waveform move, and hear where you&apos;ll be in a few weeks.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {beats.map((b) => (
            <BeatCard key={b.id} beat={b} />
          ))}
        </div>
      </div>
    </section>
  )
}
