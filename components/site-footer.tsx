'use client'

import { useState } from 'react'
import { AudioWaveform, Video, Camera, Cloud, ArrowRight, Check } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const socials = [
  { label: 'YouTube', icon: Video, href: '#' },
  { label: 'Instagram', icon: Camera, href: '#' },
  { label: 'SoundCloud', icon: Cloud, href: '#' },
]

export function SiteFooter() {
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setJoined(true)
    setEmail('')
  }

  return (
    <footer className="relative border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-xl bg-neon-cyan text-primary-foreground shadow-glow-cyan">
                <AudioWaveform className="size-5" />
              </span>
              <span className="font-display text-lg font-bold tracking-tight">
                PULSE<span className="text-neon-cyan">.</span>
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              The beginner beat-making course that takes you from your first
              project file to a finished, release-ready track.
            </p>
            <div className="mt-5 flex gap-2">
              {socials.map((s) => {
                const Icon = s.icon
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="flex size-9 items-center justify-center rounded-lg border border-border bg-background/40 text-muted-foreground transition-colors hover:border-neon-cyan/40 hover:text-neon-cyan"
                  >
                    <Icon className="size-4" />
                  </a>
                )
              })}
            </div>
          </div>

          <div className="md:justify-self-end md:text-right">
            <h3 className="font-display text-base font-semibold">Join the waitlist</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Get a free drum kit and early access to new lessons.
            </p>
            <form onSubmit={onSubmit} className="mt-4 flex max-w-sm gap-2 md:ml-auto">
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                aria-label="Email address"
                className="h-11 flex-1 bg-background/40"
              />
              <Button
                type="submit"
                size="lg"
                className="h-11 shrink-0 bg-neon-cyan text-primary-foreground hover:bg-neon-cyan/90"
              >
                {joined ? <Check className="size-4" /> : <ArrowRight className="size-4" />}
                <span className="sr-only md:not-sr-only">{joined ? 'Joined' : 'Join'}</span>
              </Button>
            </form>
            {joined && (
              <p className="mt-2 text-xs text-neon-cyan">You&apos;re on the list — check your inbox!</p>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} PULSE Beat Academy. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="transition-colors hover:text-foreground">Privacy</a>
            <a href="#" className="transition-colors hover:text-foreground">Terms</a>
            <a href="#" className="transition-colors hover:text-foreground">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
