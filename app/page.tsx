import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/hero'
import { BeatShowcase } from '@/components/beat-showcase'
import { Curriculum } from '@/components/curriculum'
import { Instructor } from '@/components/instructor'
import { Pricing } from '@/components/pricing'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <div className="min-h-dvh bg-background">
      <SiteNav />
      <main>
        <Hero />
        <BeatShowcase />
        <Curriculum />
        <Instructor />
        <Pricing />
      </main>
      <SiteFooter />
    </div>
  )
}
