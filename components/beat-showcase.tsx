'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Play, Pause, Download, RotateCcw } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Waveform } from '@/components/audio-visuals'
import { cn } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'

type Beat = {
  id: string
  title: string
  artists: string[] // shown as badges; empty/duplicate names are skipped
  duration: number // seconds (only used for beats without a src)
  color: 'cyan' | 'magenta'
  seed: number
  src?: string // path to an audio file in /public, e.g. '/beats/my-beat.mp3'
  start?: number // seconds into the file where the preview starts (default 0)
  end?: number // seconds into the file where the preview stops (default: end of file)
}

const beats: Beat[] = [
  { id: 'b1', title: 'Gants Aldaa', artists: ['206', 'X', 'NMA'], duration: 38, color: 'cyan', seed: 21, src: '/gantsAldaa.mp3', start: 130, end: 150 },
  { id: 'b2', title: 'Terbum', artists: ['FRUITYBAACHKA', 'BEKTOR PETROVIC'], duration: 44, color: 'magenta', seed: 34, src: '/terbum.mp3', start: 10, end: 30 },
  { id: 'b3', title: 'Ohid namaig', artists: ['113', '168'], duration: 52, color: 'cyan', seed: 45, src: '/ohidNamaig.mp3', start: 0, end: 30 },
  { id: 'b4', title: 'How How', artists: ['BEKATRINA', 'FRUITYBAACHKA'], duration: 33, color: 'magenta', seed: 58, src: '/howHow.mp3', start: 0, end: 30 },
  { id: 'b5', title: 'Deep Current', artists: ['FRUITYBAACHKA', 'BEKTOR PETROVIC', 'GINJIN'], duration: 48, color: 'cyan', seed: 63, src: '/miniiDuu.mp3', start: 30, end: 50 },
  { id: 'b6', title: 'Afterglow', artists: ['290', 'BEKATRINA'], duration: 41, color: 'magenta', seed: 72, src: '/zunjinTwerk.mp3', start: 0, end: 30 },
]

// Trim names, drop empty ones and duplicates (case-insensitive)
function uniqueArtists(artists: string[]) {
  const seen = new Set<string>()
  return artists
    .map((a) => a.trim())
    .filter((a) => {
      const k = a.toLowerCase()
      if (!a || seen.has(k)) return false
      seen.add(k)
      return true
    })
}

function fmt(s: number) {
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

function BeatCard({
  beat,
  playing,
  onToggle,
  onEnded,
}: {
  beat: Beat
  playing: boolean
  onToggle: () => void
  onEnded: () => void
}) {
  const { t } = useI18n()
  const start = beat.start ?? 0
  const [elapsed, setElapsed] = useState(0) // seconds since `start`
  const [fileDuration, setFileDuration] = useState<number | null>(null)
  const ref = useRef<number | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Length of the preview clip
  const clipEnd = beat.src ? (beat.end ?? fileDuration ?? start + beat.duration) : beat.duration
  const duration = Math.max(0, clipEnd - start)

  // Real audio: let the <audio> element drive playback
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      // Jump to the start point if we're outside the clip
      if (audio.currentTime < start || audio.currentTime >= clipEnd) {
        audio.currentTime = start
      }
      audio.play().catch(() => onEnded())
    } else {
      audio.pause()
    }
  }, [playing]) // eslint-disable-line react-hooks/exhaustive-deps

  // No audio file: simulate playback with a timer
  useEffect(() => {
    if (playing && !beat.src) {
      let e = elapsed
      ref.current = window.setInterval(() => {
        e += 0.1
        if (e >= duration) {
          setElapsed(0)
          onEnded()
        } else {
          setElapsed(e)
        }
      }, 100)
    }
    return () => {
      if (ref.current) window.clearInterval(ref.current)
    }
  }, [playing, beat.src]) // eslint-disable-line react-hooks/exhaustive-deps

  const stopAtEnd = () => {
    const audio = audioRef.current
    if (audio) {
      audio.pause()
      audio.currentTime = start
    }
    setElapsed(0)
    onEnded()
  }

  const handleRestart = () => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = start
    setElapsed(0)
    // If paused, start playing (the effect above calls audio.play())
    if (!playing) onToggle()
  }

  const progress = duration > 0 ? Math.min(1, elapsed / duration) : 0
  const isCyan = beat.color === 'cyan'

  return (
    <Card className="group/beat gap-4 p-4 ring-1 ring-border transition-colors hover:ring-foreground/20">
      {beat.src && (
        <audio
          ref={audioRef}
          src={beat.src}
          preload="metadata"
          onLoadedMetadata={(e) => setFileDuration(e.currentTarget.duration)}
          onTimeUpdate={(e) => {
            const time = e.currentTarget.currentTime
            if (time >= clipEnd) stopAtEnd()
            else setElapsed(Math.max(0, time - start))
          }}
          onEnded={stopAtEnd}
        />
      )}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-semibold leading-tight">{beat.title}</h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {uniqueArtists(beat.artists).map((artist) => (
              <Badge
                key={artist}
                variant="outline"
                className={cn(
                  'border-transparent',
                  isCyan ? 'bg-neon-cyan/10 text-neon-cyan' : 'bg-neon-magenta/10 text-neon-magenta',
                )}
              >
                {artist}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          {beat.src && (
            <Button
              variant="ghost"
              size="icon"
              aria-label={`Restart ${beat.title}`}
              onClick={handleRestart}
              className="size-9 shrink-0 text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="size-4" />
            </Button>
          )}

          <Button
            size="icon-lg"
            aria-label={playing ? `Pause ${beat.title}` : `Play ${beat.title}`}
            onClick={onToggle}
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
      </div>

      <div className="h-14 w-full rounded-lg bg-background/40 p-2">
        <Waveform seed={beat.seed} bars={48} progress={progress} active={playing} color={beat.color} />
      </div>

      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-muted-foreground tabular-nums">
          {fmt(elapsed)} / {fmt(duration)}
        </span>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          <Download className="size-3.5" />
          {t.beats.previewStem}
        </Button>
      </div>
    </Card>
  )
}

export function BeatShowcase() {
  const { t } = useI18n()
  const [playingId, setPlayingId] = useState<string | null>(null)
  const stop = useCallback(() => setPlayingId(null), [])

  return (
    <section id="beats" className="relative scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-12 max-w-2xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-neon-cyan">{t.beats.eyebrow}</p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-balance md:text-4xl">
            {t.beats.heading}
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            {t.beats.subtext}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {beats.map((b) => (
            <BeatCard
              key={b.id}
              beat={b}
              playing={playingId === b.id}
              onToggle={() => setPlayingId((id) => (id === b.id ? null : b.id))}
              onEnded={stop}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
