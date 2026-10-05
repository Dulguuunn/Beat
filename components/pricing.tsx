'use client'

import { Check, ShieldCheck, Zap } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/lib/i18n'

export function Pricing() {
  const { t } = useI18n()

  return (
    <section id="pricing" className="relative scroll-mt-24 py-20 md:py-28">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-72 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-cyan/10 blur-[120px]" />
      <div className="mx-auto max-w-2xl px-4">
        <div className="mb-10 text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-neon-cyan">
            {t.pricing.eyebrow}
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-balance md:text-4xl">
            {t.pricing.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground text-pretty">
            {t.pricing.subtext}
          </p>
        </div>

        <Card className="glass relative gap-0 overflow-visible border-neon-cyan/30 p-0 shadow-glow-cyan">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <Badge className="gap-1 bg-neon-cyan px-3 text-primary-foreground">
              <Zap className="size-3" />
              {t.pricing.founders}
            </Badge>
          </div>

          <div className="p-6 pt-9 md:p-8 md:pt-10">
            <div className="flex items-end justify-center gap-2">
              <span className="font-display text-5xl font-bold tracking-tight">$149</span>
              <span className="mb-1.5 text-sm text-muted-foreground line-through">$249</span>
            </div>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              {t.pricing.priceNote}
            </p>

            <ul className="mt-7 space-y-3">
              {t.pricing.features.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-neon-cyan/15 text-neon-cyan">
                    <Check className="size-3" />
                  </span>
                  <span className="text-foreground/90">{f}</span>
                </li>
              ))}
            </ul>

            <Button
              size="lg"
              className="mt-8 h-12 w-full bg-neon-cyan text-base text-primary-foreground shadow-glow-cyan hover:bg-neon-cyan/90"
            >
              {t.pricing.enrollNow}
            </Button>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="size-4 text-neon-cyan" />
              {t.pricing.guarantee}
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
