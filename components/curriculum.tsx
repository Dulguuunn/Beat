import { SlidersHorizontal, Drum, Music4, Rocket } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'

const modules = [
  {
    value: 'm1',
    icon: SlidersHorizontal,
    title: 'DAW Setup & Core Interface',
    tag: 'Foundations',
    desc: 'Get comfortable in your DAW from day one.',
    points: [
      'Navigating the workspace, transport, and mixer',
      'Installing and routing plugins & virtual instruments',
      'Setting tempo, key, and a clean project template',
    ],
  },
  {
    value: 'm2',
    icon: Drum,
    title: 'Drum Theory & Bounce',
    tag: 'Rhythm',
    desc: 'Design knocking drums and 808s that hit.',
    points: [
      'Programming kicks, snares, and hi-hat patterns',
      'Tuning 808s and locking bass to your drums',
      'Adding swing, groove, and bounce to any beat',
    ],
  },
  {
    value: 'm3',
    icon: Music4,
    title: 'Melodies & Chord Progression',
    tag: 'No theory required',
    desc: 'Write catchy melodies without reading a note.',
    points: [
      'Using scale locks to never hit a wrong note',
      'Building simple, emotional chord progressions',
      'Layering synths and textures for a full sound',
    ],
  },
  {
    value: 'm4',
    icon: Rocket,
    title: 'Mixing, Mastering & Exporting',
    tag: 'Release ready',
    desc: 'Finish tracks at radio-ready quality.',
    points: [
      'EQ, compression, and balancing your mix',
      'Simple mastering chain for loudness and clarity',
      'Exporting stems and final files for release',
    ],
  },
]

export function Curriculum() {
  return (
    <section id="curriculum" className="relative scroll-mt-24 py-20 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-64 -translate-y-1/2 bg-neon-magenta/5 blur-[120px]" />
      <div className="mx-auto max-w-4xl px-4">
        <div className="mb-12 text-center">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-neon-cyan">
            Beginner Roadmap
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-balance md:text-4xl">
            What You Will Learn
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground text-pretty">
            Four focused modules take you from opening your DAW for the first time
            to exporting a finished, release-ready beat.
          </p>
        </div>

        <Accordion defaultValue={['m1']} className="glass rounded-2xl border border-border px-5">
          {modules.map((m, i) => {
            const Icon = m.icon
            return (
              <AccordionItem key={m.value} value={m.value}>
                <AccordionTrigger className="py-5 hover:no-underline">
                  <div className="flex items-center gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-background/50 text-neon-cyan">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-muted-foreground">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <Badge
                          variant="outline"
                          className="border-neon-cyan/25 bg-neon-cyan/5 text-[10px] text-neon-cyan"
                        >
                          {m.tag}
                        </Badge>
                      </div>
                      <h3 className="mt-1 font-display text-base font-semibold md:text-lg">
                        {m.title}
                      </h3>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-15">
                  <p className="mb-3 text-muted-foreground">{m.desc}</p>
                  <ul className="space-y-2">
                    {m.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-sm">
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-neon-cyan" />
                        <span className="text-foreground/90">{p}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>
    </section>
  )
}
