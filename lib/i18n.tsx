'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

export type Locale = 'mn' | 'en'

const STORAGE_KEY = 'pulse-lang'
const DEFAULT_LOCALE: Locale = 'mn'

// ---------------------------------------------------------------------------
// Translation dictionaries. Both locales MUST share the same shape.
// Music terms (artist1, key, artist2) and proper nouns are intentionally left as-is.
// ---------------------------------------------------------------------------
const messages = {
  en: {
    nav: {
      curriculum: 'Curriculum',
      beats: 'Beat Previews',
      instructor: 'Instructor',
      pricing: 'Pricing',
      getStarted: 'Get Started',
    },
    hero: {
      eyebrow: 'Where beginners become producers',
      title1: 'From Zero',
      title2: 'To Your',
      title3: 'First Beat.',
      paragraph:
        'Master your DAW, program punchy rhythms, and turn raw ideas into finished, radio-ready tracks with clear, step-by-step guidance built for total beginners.',
      enroll: 'Enroll in the Course',
      listen: 'Listen to Beat Demos',
      statValue: '50+',
      statLabel1: 'Beats produced',
      statLabel2: 'in the course',
      modules: '4 Core Modules',
    },
    beats: {
      eyebrow: 'Portfolio',
      heading: 'Produced Stems & Demo Beats',
      subtext:
        "Real beats made using the exact techniques taught in the course. Hit play, watch the waveform move, and hear where you'll be in a few weeks.",
      previewStem: 'Preview stem',
    },
    curriculum: {
      eyebrow: 'Beginner Roadmap',
      heading: 'What You Will Learn',
      subtext:
        'Four focused modules take you from opening your DAW for the first time to exporting a finished, release-ready beat.',
      modules: [
        {
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
          title: 'Mixing, Mastering & Exporting',
          tag: 'Release ready',
          desc: 'Finish tracks at radio-ready quality.',
          points: [
            'EQ, compression, and balancing your mix',
            'Simple mastering chain for loudness and clarity',
            'Exporting stems and final files for release',
          ],
        },
      ],
    },
    instructor: {
      eyebrow: 'Your Instructor',
      heading: 'Learn from a producer who started exactly where you are.',
      quote:
        '"I taught myself on a laptop with zero theory. This course is the shortcut I wish I\'d had — no fluff, just the exact steps to your first finished beat."',
      name: 'Jordan Vega',
      role: 'Producer & Sound Designer',
      stats: ['Beats Produced', 'Native Workflow', 'Beginner Friendly'],
    },
    pricing: {
      eyebrow: 'Pricing',
      heading: 'One course. Everything you need.',
      subtext: 'Get lifetime access to the complete beginner beat-making system.',
      founders: 'Founders Edition',
      priceNote: 'One-time payment · Lifetime access',
      features: [
        'Full access to all 4 video modules',
        'Downloadable beginner sample pack & drum kit',
        'Ready-to-use project templates for FL & Ableton',
        'Direct Discord community + producer support',
        'Lifetime access & all future updates',
        'Beat feedback from the instructor',
      ],
      enrollNow: 'Enroll Now',
      guarantee: '30-day money-back satisfaction guarantee',
    },
    footer: {
      brandDesc:
        'The beginner beat-making course that takes you from your first project file to a finished, release-ready track.',
      joinWaitlist: 'Join the waitlist',
      waitlistDesc: 'Get a free drum kit and early access to new lessons.',
      emailPlaceholder: 'you@email.com',
      join: 'Join',
      joined: 'Joined',
      joinedMsg: "You're on the list — check your inbox!",
      rights: 'All rights reserved.',
      privacy: 'Privacy',
      terms: 'Terms',
      contact: 'Contact',
    },
  },

  mn: {
    nav: {
      curriculum: 'Хөтөлбөр',
      beats: 'Битүүд',
      instructor: 'Багш',
      pricing: 'Үнэ',
      getStarted: 'Эхлэх',
    },
    hero: {
      eyebrow: 'Анхан шатнаас продюсер болох зам',
      title1: 'Тэгээс',
      title2: 'Анхны',
      title3: 'Бит хүртэл.',
      paragraph:
        'DAW-аа эзэмшиж, цохилттой хэмнэл програмчилж, түүхий санаагаа бэлэн, чанартай трек болгон хувиргаарай — анхан шатны хүмүүст зориулсан алхам алхмаар заавартай.',
      enroll: 'Хичээлд бүртгүүлэх',
      listen: 'Бит сонсох',
      statValue: '50+',
      statLabel1: 'Хичээл дээр хийсэн',
      statLabel2: 'битүүд',
      modules: '4 үндсэн модуль',
    },
    beats: {
      eyebrow: 'Портфолио',
      heading: 'Хийсэн битүүд ба жишээ трекүүд',
      subtext:
        'Хичээл дээр заадаг яг тэр аргуудаар хийсэн жинхэнэ битүүд. Тоглуулаад, долгионы хөдөлгөөнийг хараад, хэдхэн долоо хоногийн дараа та хаана байхаа сонсоорой.',
      previewStem: 'Сонсох',
    },
    curriculum: {
      eyebrow: 'Анхан шатны зам',
      heading: 'Та юу сурах вэ',
      subtext:
        'Дөрвөн төвлөрсөн модуль таныг DAW-аа анх нээснээс эхлээд бэлэн, гаргахад бэлэн бит экспортлох хүртэл дагуулна.',
      modules: [
        {
          title: 'DAW тохиргоо ба үндсэн интерфейс',
          tag: 'Суурь',
          desc: 'Эхний өдрөөс DAW дотроо эвтэйхэн болцгооё.',
          points: [
            'Ажлын талбар, транспорт, миксертэй танилцах',
            'Плагин болон виртуал хөгжим суулгаж, чиглүүлэх',
            'Хэмнэл, түлхүүр тохируулж, цэвэрхэн төслийн загвар үүсгэх',
          ],
        },
        {
          title: 'Драм ба хэмнэлийн мэдрэмж',
          tag: 'Хэмнэл',
          desc: 'Цохилттой драм болон 808 басс бүтээх.',
          points: [
            'Кик, снейр, хай-хэтийн хэв маягийг програмчлах',
            '808-г тааруулж, бассыг драмтайгаа нийцүүлэх',
            'Битдээ свинг, грув, хөдөлгөөн нэмэх',
          ],
        },
        {
          title: 'Аялгуу ба аккордын дараалал',
          tag: 'Онол шаардлагагүй',
          desc: 'Нот уншилгүйгээр сэтгэл татам аялгуу бичих.',
          points: [
            'Скейл түгжээ ашиглан буруу нот дарахгүй байх',
            'Энгийн, сэтгэл хөдөлгөм аккордын дараалал бүтээх',
            'Дүүрэн авиа гаргахаар синт ба текстур давхарлах',
          ],
        },
        {
          title: 'Микс, мастеринг ба экспорт',
          tag: 'Гаргахад бэлэн',
          desc: 'Трекээ радиод бэлэн чанартай дуусгах.',
          points: [
            'EQ, компресс, миксийн тэнцвэр',
            'Чанга, тод авианы энгийн мастеринг',
            'Стем ба эцсийн файлуудыг экспортлох',
          ],
        },
      ],
    },
    instructor: {
      eyebrow: 'Таны багш',
      heading: 'Яг таны байгаа газраас эхэлсэн продюсерээс суралц.',
      quote:
        '«Би зөөврийн компьютер дээр, ямар ч онолгүйгээр өөрөө сурсан. Энэ хичээл бол миний хүсч байсан товчлол — илүү юмгүй, зөвхөн анхны бит хүртэлх яг алхмууд.»',
      name: 'Jordan Vega',
      role: 'Продюсер ба саунд дизайнер',
      stats: ['Хийсэн битүүд', 'Ажлын орчин', 'Анхан шатанд ээлтэй'],
    },
    pricing: {
      eyebrow: 'Үнэ',
      heading: 'Нэг хичээл. Хэрэгтэй бүхэн.',
      subtext: 'Анхан шатны бит хийх бүрэн системд насан туршийн эрх аваарай.',
      founders: 'Founders хувилбар',
      priceNote: 'Нэг удаагийн төлбөр · Насан туршийн эрх',
      features: [
        '4 видео модульд бүрэн хандах эрх',
        'Татаж авах анхан шатны сэмпл багц ба драм кит',
        'FL ба Ableton-д бэлэн төслийн загварууд',
        'Discord нийгэмлэг ба продюсерийн шууд дэмжлэг',
        'Насан туршийн эрх ба бүх шинэчлэлт',
        'Багшаас битийн санал зөвлөгөө',
      ],
      enrollNow: 'Одоо бүртгүүлэх',
      guarantee: '30 хоногийн буцаан олголтын баталгаа',
    },
    footer: {
      brandDesc:
        'Анхны төслийн файлаас эхлээд бэлэн, гаргахад бэлэн трек хүртэл хөтлөх анхан шатны бит хийх хичээл.',
      joinWaitlist: 'Хүлээлгийн жагсаалтад нэгдэх',
      waitlistDesc: 'Үнэгүй драм кит болон шинэ хичээлийн эрт хандалт аваарай.',
      emailPlaceholder: 'ta@email.com',
      join: 'Нэгдэх',
      joined: 'Нэгдсэн',
      joinedMsg: 'Та жагсаалтад орлоо — имэйлээ шалгаарай!',
      rights: 'Бүх эрх хамгаалагдсан.',
      privacy: 'Нууцлал',
      terms: 'Нөхцөл',
      contact: 'Холбоо барих',
    },
  },
} as const

// The EN dictionary defines the canonical shape for type-safety.
export type Messages = (typeof messages)['en']

type I18nContextValue = {
  locale: Locale
  setLocale: (l: Locale) => void
  toggle: () => void
  t: Messages
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE)

  // Restore the saved preference after mount (avoids hydration mismatch).
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as Locale | null
    // The browser-only preference is restored after hydration intentionally.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved === 'en' || saved === 'mn') setLocaleState(saved)
  }, [])

  // Keep <html lang> and storage in sync with the active locale.
  useEffect(() => {
    document.documentElement.lang = locale
    window.localStorage.setItem(STORAGE_KEY, locale)
  }, [locale])

  const setLocale = useCallback((l: Locale) => setLocaleState(l), [])
  const toggle = useCallback(
    () => setLocaleState((l) => (l === 'mn' ? 'en' : 'mn')),
    [],
  )

  const value = useMemo<I18nContextValue>(
    () => ({ locale, setLocale, toggle, t: messages[locale] as Messages }),
    [locale, setLocale, toggle],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within a LanguageProvider')
  return ctx
}
