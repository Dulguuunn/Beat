import Image from 'next/image'
import { Play, Headphones, ArrowRight, Disc3 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden">
      {/* Full-bleed background image (swap /hero-bg.png for your own) */}
      <Image
        src="/hero-bg.png"
        alt="Music producer working in a dark studio at night"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      {/* Dark overlay for text legibility */}
      <div className="hero-overlay pointer-events-none absolute inset-0" />
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-between px-4 pb-10 pt-32 md:pb-14 md:pt-36">
        {/* Top block: eyebrow + headline + right-aligned paragraph */}
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div>
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Where beginners become producers
            </p>
            <h1 className="font-display text-6xl font-extrabold uppercase leading-[0.9] tracking-tight text-balance sm:text-7xl md:text-8xl">
              From Zero
              <br />
              To Your
              <br />
              <span className="text-muted-foreground">First Beat.</span>
            </h1>
          </div>

          <p className="max-w-xs text-base leading-relaxed text-muted-foreground text-pretty lg:justify-self-end lg:pt-28">
            Master your DAW, program punchy rhythms, and turn raw ideas into
            finished, radio-ready tracks with clear, step-by-step guidance built
            for total beginners.
          </p>
        </div>

        {/* Bottom block: CTAs (left) + stat card (right) */}
        <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              nativeButton={false}
              className="h-12 rounded-full bg-foreground px-6 text-base font-semibold text-background hover:bg-foreground/90"
              render={<a href="#pricing" />}
            >
              Enroll in the Course
              <ArrowRight className="size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              className="h-12 rounded-full border-foreground/25 bg-background/20 px-6 text-base backdrop-blur-sm hover:bg-background/40"
              render={<a href="#beats" />}
            >
              <Headphones className="size-4" />
              Listen to Beat Demos
            </Button>
          </div>

          {/* Glass stat card */}
          <div className="glass relative w-full max-w-xs overflow-hidden rounded-2xl border border-border p-6 sm:w-64">
            <Disc3 className="animate-spin-slow absolute right-4 top-4 size-6 text-muted-foreground" />
            <p className="font-display text-5xl font-extrabold tracking-tight">50+</p>
            <p className="mt-2 text-xs uppercase tracking-[0.15em] text-muted-foreground">
              Beats produced
              <br />
              in the course
            </p>
            <div className="mt-4 border-t border-border pt-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                4 Core Modules
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
