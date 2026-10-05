'use client'

import { useState } from 'react'
import { AudioWaveform, Menu, X, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useI18n } from '@/lib/i18n'

export function SiteNav() {
  const [open, setOpen] = useState(false)
  const { t, toggle, locale } = useI18n()

  const links = [
    { label: t.nav.curriculum, href: '#curriculum' },
    { label: t.nav.beats, href: '#beats' },
    { label: t.nav.instructor, href: '#instructor' },
    { label: t.nav.pricing, href: '#pricing' },
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto max-w-6xl px-4">
        <nav className="glass mt-3 flex items-center justify-between rounded-2xl border border-border px-4 py-2.5">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-neon-cyan text-primary-foreground shadow-glow-cyan">
              <AudioWaveform className="size-5" />
            </span>
            <span className="font-display text-lg font-bold tracking-tight">
              PULSE<span className="text-neon-cyan">.</span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-2 md:flex">
            {/* Language toggle */}
            <button
              onClick={toggle}
              className="rounded-lg border border-border px-2.5 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-neon-cyan/40 hover:text-neon-cyan"
              aria-label="Switch language"
            >
              {locale === 'mn' ? 'EN' : 'МН'}
            </button>
            <Button
              size="lg"
              nativeButton={false}
              className="bg-neon-cyan text-primary-foreground shadow-glow-cyan hover:bg-neon-cyan/90"
              render={<a href="#pricing" />}
            >
              {t.nav.getStarted}
              <ArrowRight className="size-4" />
            </Button>
          </div>

          <button
            className="inline-flex size-9 items-center justify-center rounded-lg text-foreground md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>

        <div
          className={cn(
            'glass mt-2 overflow-hidden rounded-2xl border border-border md:hidden',
            open ? 'block' : 'hidden',
          )}
        >
          <ul className="flex flex-col p-2">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="flex items-center gap-2 p-1">
              <button
                onClick={toggle}
                className="rounded-lg border border-border px-2.5 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-neon-cyan/40 hover:text-neon-cyan"
              >
                {locale === 'mn' ? 'EN' : 'МН'}
              </button>
              <Button
                nativeButton={false}
                className="flex-1 bg-neon-cyan text-primary-foreground hover:bg-neon-cyan/90"
                render={<a href="#pricing" onClick={() => setOpen(false)} />}
              >
                {t.nav.getStarted}
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
