import Image from 'next/image'
import { Disc3, Cpu, GraduationCap, Quote } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const stats = [
  { icon: Disc3, value: '50+', label: 'Beats Produced' },
  { icon: Cpu, value: 'FL & Ableton', label: 'Native Workflow' },
  { icon: GraduationCap, value: '100%', label: 'Beginner Friendly' },
]

export function Instructor() {
  return (
    <section id="instructor" className="scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <Card className="glass gap-0 overflow-hidden border-border p-0 ring-1 ring-border md:grid md:grid-cols-2">
          <div className="relative min-h-64 md:min-h-full">
            <Image
              src="/studio-setup.png"
              alt="A home studio with a DAW on screen, MIDI keyboard, monitors, and headphones"
              fill
              className="object-cover grayscale"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent md:bg-gradient-to-r" />
          </div>

          <div className="flex flex-col justify-center p-6 md:p-10">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-neon-cyan">
              Your Instructor
            </p>
            <h2 className="font-display text-2xl font-bold tracking-tight text-balance md:text-3xl">
              Learn from a producer who started exactly where you are.
            </h2>

            <div className="mt-5 flex items-start gap-3 rounded-xl border border-border bg-background/40 p-4">
              <Quote className="size-5 shrink-0 text-neon-magenta" />
              <p className="text-sm leading-relaxed text-muted-foreground">
                &ldquo;I taught myself on a laptop with zero theory. This course is the
                shortcut I wish I&apos;d had — no fluff, just the exact steps to your first
                finished beat.&rdquo;
              </p>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-full bg-neon-cyan font-display font-bold text-primary-foreground">
                JV
              </span>
              <div>
                <p className="font-display font-semibold">Jordan Vega</p>
                <Badge variant="outline" className="border-border text-muted-foreground">
                  Producer & Sound Designer
                </Badge>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {stats.map((s) => {
                const Icon = s.icon
                return (
                  <div
                    key={s.label}
                    className="rounded-xl border border-border bg-background/40 p-3 text-center"
                  >
                    <Icon className="mx-auto mb-2 size-4 text-neon-cyan" />
                    <div className="font-display text-base font-bold leading-tight text-balance">
                      {s.value}
                    </div>
                    <div className="mt-0.5 text-[11px] leading-tight text-muted-foreground">
                      {s.label}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
