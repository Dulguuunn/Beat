'use client'

import { useState } from 'react'
import { AudioWaveform, Video, Camera, Cloud, ArrowRight, Check } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/lib/i18n'

const socials = [
  { label: 'YouTube', icon: Video, href: '#' },
  { label: 'Instagram', icon: Camera, href: '#' },
  { label: 'SoundCloud', icon: Cloud, href: '#' },
]

export function SiteFooter() {
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)
  const { t } = useI18n()

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
              {t.footer.brandDesc}
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
            <h3 className="font-display text-base font-semibold">{t.footer.joinWaitlist}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {t.footer.waitlistDesc}
            </p>
            <form onSubmit={onSubmit} className="mt-4 flex max-w-sm gap-2 md:ml-auto">
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.footer.emailPlaceholder}
                aria-label="Email address"
                className="h-11 flex-1 bg-background/40"
              />
              <Button
                type="submit"
                size="lg"
                className="h-11 shrink-0 bg-neon-cyan text-primary-foreground hover:bg-neon-cyan/90"
              >
                {joined ? <Check className="size-4" /> : <ArrowRight className="size-4" />}
                <span className="sr-only md:not-sr-only">{joined ? t.footer.joined : t.footer.join}</span>
              </Button>
            </form>
            {joined && (
              <p className="mt-2 text-xs text-neon-cyan">{t.footer.joinedMsg}</p>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} PULSE Beat Academy. {t.footer.rights}</p>
          <div className="flex gap-5">
            <a href="#" className="transition-colors hover:text-foreground">{t.footer.privacy}</a>
            <a href="#" className="transition-colors hover:text-foreground">{t.footer.terms}</a>
            <a href="#" className="transition-colors hover:text-foreground">{t.footer.contact}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
