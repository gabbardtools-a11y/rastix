"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Truck,
  Shield,
  Star,
  Leaf,
  TreePine,
  Flower2,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  Heart,
  ShoppingCart,
  Search,
  Users,
  Award,
  Sprout,
  Sun,
  ArrowRight,
  CheckCircle,
  Instagram,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/* ─── Data ─── */
const CATEGORIES = [
  {
    name: "Хризантема мультифлора",
    slug: "/hrizantema-multiflora",
    img: "https://agrodecor.ru/thumb/2/1-0_9CHM6jJfUvmFyEzMhA/160c145/d/hrizantema_multiflora.jpg",
  },
  {
    name: "Ампельные цветы",
    slug: "/ampelnye-cvety",
    img: "https://agrodecor.ru/thumb/2/kJPyIJMR0kpZ7beI1d_5mQ/160c145/d/image_458.jpg",
  },
  {
    name: "Рассада овощей",
    slug: "/rassada-ovoshchej",
    img: "https://agrodecor.ru/thumb/2/q9zPyjaDl_gk9Kzs1XxsEA/160c145/d/kapusta_tsvetnaya.jpg",
  },
  {
    name: "Рассада цветов",
    slug: "/rassada-cvetov",
    img: "https://agrodecor.ru/thumb/2/MSogzedpkTPpygn7NxPMYg/160c145/d/image_286.jpg",
  },
  {
    name: "Лук-севок",
    slug: "/luk-sevok",
    img: "https://agrodecor.ru/thumb/2/ujkF8bCvIdXRQfJ2NkyaMg/160c145/d/luk_sevok.jpg",
  },
  {
    name: "Многолетние цветы",
    slug: "/mnogoletnie-cvety",
    img: "https://agrodecor.ru/thumb/2/xXXWd92_lQCbi3ShxRnJ6Q/160c145/d/_maggie_daley.jpg",
  },
  {
    name: "Пряные травы",
    slug: "/pryanye-travy",
    img: "https://agrodecor.ru/thumb/2/nFhtkA4-iDkenUaSYAGzfg/160c145/d/pryanyye_travy.jpg",
  },
  {
    name: "Пионы",
    slug: "/piony",
    img: "https://agrodecor.ru/thumb/2/e6fNDDfvVZMsD8IcfAJHdg/160c145/d/selebriti.jpg",
  },
  {
    name: "Декоративные саженцы",
    slug: "/dekorativnye-sazhency",
    img: "https://agrodecor.ru/thumb/2/tuH2WK809GsuW73OndIndQ/160c145/d/golden_ring5.jpg",
  },
  {
    name: "Плодовые саженцы",
    slug: "/plodovye-sazhency-optom-i-v-roznicu",
    img: "https://agrodecor.ru/thumb/2/nvpmYC643D-kHSmrL844lw/160c145/d/podarok_grafskomu.jpg",
  },
  {
    name: "Рододендроны",
    slug: "/rododendrony",
    img: "https://agrodecor.ru/thumb/2/sJC8_E2DNzKe9Eo6MJyTVA/160c145/d/rododendron_grandiflorum.jpg",
  },
  {
    name: "Земляника садовая",
    slug: "/sazhency-sadovoj-zemlyaniki",
    img: "https://agrodecor.ru/thumb/2/oqgDDvKggHcx2CKagUYv6g/160c145/d/kleri_2.jpg",
  },
  {
    name: "Розы David Austin",
    slug: "/sazhency-roz-david-austin",
    img: "https://agrodecor.ru/thumb/2/qTwcZCI_YjWc9kTc88cCzQ/160c145/d/%D0%90%D0%B1%D1%80%D0%B0%D1%85%D0%B0%D0%BC_%D0%94%D0%B5%D1%80%D0%B1%D0%B8.jpg",
  },
  {
    name: "Розы Мускусные",
    slug: "/sazhency-roz-muskusnyh",
    img: "https://agrodecor.ru/thumb/2/cbESZfLOvjeBHN160YSweQ/160c145/d/roza_muskusnaya.jpg",
  },
  {
    name: "Розы (Россия)",
    slug: "/sazhency-roz-rossiya",
    img: "https://agrodecor.ru/thumb/2/9N8OsLR_gEsjZsEoKauPxQ/160c145/d/pink_intuition.jpg",
  },
  {
    name: "Гортензии",
    slug: "/sazhency-gortenzii",
    img: "https://agrodecor.ru/thumb/2/bBlk-I2iEf7F1j6MorYLwQ/160c145/d/gortenziya_metelchataya_vanilla_freyz.jpg",
  },
  {
    name: "Клематисы",
    slug: "/sazhency-klematisov",
    img: "https://agrodecor.ru/thumb/2/O0tesQ158Wdk9z3BsBdE4w/160c145/d/piilu.jpg",
  },
  {
    name: "Хвойные саженцы",
    slug: "/hvojnye-sazhency",
    img: "https://agrodecor.ru/thumb/2/vjyIeA34szCSipDgKr-_Eg/160c145/d/khvoyniki.jpg",
  },
  {
    name: "Срезка Тюльпанов",
    slug: "/tyulpany-optom-ot-proizvoditelya",
    img: "https://agrodecor.ru/thumb/2/ysEk8dxTj_fLYjpf2At0UQ/160c145/d/leenvandermark_1.jpg",
  },
  {
    name: "Газоны (семена)",
    slug: "/gazony-semena",
    img: "https://agrodecor.ru/thumb/2/Y2d-kCza7wF1LqTmTvixhg/160c145/d/gazonnaya_trava.jpg",
  },
  {
    name: "Грунты и Удобрения",
    slug: "/grunty-i-udobreniya",
    img: "https://agrodecor.ru/thumb/2/TtXkxexruQeHm1CCQJ4hDw/160c145/d/i_0.jpg",
  },
  {
    name: "Кора мульча",
    slug: "/kora-mulcha",
    img: "https://agrodecor.ru/thumb/2/q3Bv6fELBPvi3r7LrjMd8A/160c145/d/kora_mulcha.jpg",
  },
];

const FEATURED_PRODUCTS = [
  {
    name: "Пузыреплодник Диабло",
    slug: "/puzyreplodnik-diablo",
    img: "https://agrodecor.ru/thumb/2/NWwwG_u6q45G9mg9zlCm7w/400r400/d/puzyreplotnik_diaplo_1.jpg",
    price: "от 1 200 ₽",
    badge: "Хит",
  },
  {
    name: "Каллизия (Традесканция мелколистная) кашпо",
    slug: "/kalliziya-tradeskanciya-melkolistnaya-kashpo",
    img: "https://agrodecor.ru/thumb/2/fk138bA8Mv59IcLrjyLt6A/400r400/d/4f03b350-a400-48ed-880f-654592dde4a9.jpg",
    price: "от 450 ₽",
    badge: "Новинка",
  },
  {
    name: "Рябина Вефед",
    slug: "/ryabina-vefed",
    img: "https://agrodecor.ru/thumb/2/HkWsAgumSuhMxThiHuxnww/400r400/d/ryabina_vefed2_2.jpg",
    price: "от 890 ₽",
    badge: "",
  },
  {
    name: "Лимонник китайский Садовый №1",
    slug: "/limonnik-kitajskij-sadovyj-no1",
    img: "https://agrodecor.ru/thumb/2/kkD6i7dfM1J7vYSebH1XNw/400r400/d/image_592_1.jpg",
    price: "от 750 ₽",
    badge: "Новинка",
  },
  {
    name: "Астильба Арендса Burgundy Red",
    slug: "/astilba-arendsa-gloria-1",
    img: "https://agrodecor.ru/thumb/2/D0aA4_OeCvE2PCPZil3dEQ/400r400/d/astilba_burgundi.jpg",
    price: "от 390 ₽",
    badge: "Акция",
  },
];

const HERO_SLIDES = [
  {
    title: "Рассада, саженцы, посадки\nв Москве",
    subtitle: "Более 10 000 наименований растений от производителя с доставкой по Струнино, Александрову, Сергиеву Посаду и окрестностям",
    cta: "Перейти в каталог",
    ctaLink: "#catalog",
    img: "https://agrodecor.ru/thumb/2/1-0_9CHM6jJfUvmFyEzMhA/160c145/d/hrizantema_multiflora.jpg",
  },
  {
    title: "Рассада овощей\nи цветов",
    subtitle: "Свежая рассада напрямую из питомника. Гарантии и приживаемости",
    cta: "Выбрать рассаду",
    ctaLink: "#catalog",
    img: "https://agrodecor.ru/thumb/2/q9zPyjaDl_gk9Kzs1XxsEA/160c145/d/kapusta_tsvetnaya.jpg",
  },
  {
    title: "Саженцы роз\nDavid Austin",
    subtitle: "Эксклюзивные сорта английских роз с доставкой по Струнино, Александрову, Сергиеву Посаду и окрестностям",
    cta: "Смотреть розы",
    ctaLink: "#catalog",
    img: "https://agrodecor.ru/thumb/2/qTwcZCI_YjWc9kTc88cCzQ/160c145/d/%D0%90%D0%B1%D1%80%D0%B0%D1%85%D0%B0%D0%BC_%D0%94%D0%B5%D1%80%D0%B1%D0%B8.jpg",
  },
];

const FEATURES = [
  {
    icon: Truck,
    title: "Доставка",
    desc: "Доставляем по городам Струнино, Александров, Сергиев Посад и окрестностям",
  },
  {
    icon: Shield,
    title: "Гарантии",
    desc: "Все растения проходят фито-санитарный контроль и проверку сорта и качества",
  },
  {
    icon: Users,
    title: "Цены",
    desc: "Система скидок для постоянных и оптовых покупателей и дизайнеров ландшафта",
  },
  {
    icon: Award,
    title: "Поддержка",
    desc: "Бесплатные консультации, помощь в посадке, советы по уходу",
  },
];

const CATALOG_SIDEBAR = [
  {
    group: "Цветы",
    items: [
      "Хризантема мультифлора",
      "Луковичные (ОСЕНЬ)",
      "Ампельные цветы",
      "Рассада цветов",
      "Многолетние цветы",
      "Пионы",
      "Рододендроны",
    ],
  },
  {
    group: "Саженцы",
    items: [
      "Декоративные саженцы",
      "Плодовые саженцы",
      "Розы David Austin",
      "Розы Мускусные",
      "Розы (Россия)",
      "Гортензии",
      "Клематисы",
      "Хвойные саженцы",
    ],
  },
  {
    group: "Овощи и зелень",
    items: ["Рассада овощей", "Лук-севок", "Пряные травы", "Земляника садовая"],
  },
  {
    group: "Всё для сада",
    items: [
      "Срезка Тюльпанов",
      "Газоны (семена)",
      "Грунты и Удобрения",
      "Кора мульча",
    ],
  },
];

/* ─── Header ─── */
function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-lg border-b border-white/20 shadow-sm">
      {/* Top bar */}
      <div className="bg-green-800/85 backdrop-blur-lg text-green-50 text-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-wrap">
            <a
              href="tel:+79018887385"
              className="flex items-center gap-1.5 hover:text-green-200 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              +7 (901) 888-73-85
            </a>
            <a
              href="mailto:rassadim@ya.ru"
              className="flex items-center gap-1.5 hover:text-green-200 transition-colors hidden sm:flex"
            >
              <Mail className="w-3.5 h-3.5" />
              rassadim@ya.ru
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden md:flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Пн-Пт 9:00-18:00
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Владимирская обл., д. Лизуново, Лесная ул., 31</span>
              <span className="md:hidden">Лизуново</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3 shrink-0">
          <img
            src="/logo.png"
            alt="У Захара"
            className="h-12 w-12 rounded-xl object-cover"
            style={{ filter: 'drop-shadow(0 0 4px rgba(218, 165, 32, 0.4))' }}
          />
          <div className="hidden sm:block">
            <div className="text-xl font-bold leading-tight" style={{ color: '#b8860b', textShadow: '0 0 4px rgba(218, 165, 32, 0.3)' }}>
              У Захара
            </div>
            <div className="text-xs text-green-600 leading-tight">
              Рассада, саженцы, посадки
            </div>
          </div>
        </a>

        {/* Search */}
        <div className="flex-1 max-w-xl hidden md:block">
          <div className="relative">
            <Input
              type="text"
              placeholder="Поиск по каталогу..."
              className="w-full pl-10 pr-4 py-2.5 bg-green-50/50 border-green-200 focus:border-green-500 focus:ring-green-500/20 rounded-xl"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-400" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-green-700"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          <a href="/catalog/shop/favorites">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-amber-50"
              style={{ color: '#b8860b', textShadow: '0 0 4px rgba(218, 165, 32, 0.3)' }}
            >
              <Heart className="w-5 h-5" style={{ filter: 'drop-shadow(0 0 3px rgba(218, 165, 32, 0.4))' }} />
            </Button>
          </a>
          <a href="/catalog/shop/cart">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-amber-50 relative"
              style={{ color: '#b8860b', textShadow: '0 0 4px rgba(218, 165, 32, 0.3)' }}
            >
              <ShoppingCart className="w-5 h-5" style={{ filter: 'drop-shadow(0 0 3px rgba(218, 165, 32, 0.4))' }} />
            </Button>
          </a>
          <a href="/catalog/shop" className="hidden sm:block">
            <Button className="rounded-xl gap-2" style={{ background: 'linear-gradient(135deg, #b8860b, #daa520)', color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,0.3)', boxShadow: '0 0 12px rgba(218,165,32,0.35)' }}>
              <ShoppingCart className="w-4 h-4" />
              В магазин
            </Button>
          </a>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/20 bg-white/70 backdrop-blur-lg p-4">
          <div className="relative mb-4">
            <Input
              type="text"
              placeholder="Поиск по каталогу..."
              className="w-full pl-10 pr-4 py-2.5 bg-green-50/50 border-green-200"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-400" />
          </div>
          <nav className="flex flex-col gap-1">
            {CATALOG_SIDEBAR.map((group) => (
              <div key={group.group} className="mb-2">
                <div className="text-xs font-semibold text-green-600 uppercase tracking-wider px-3 py-1">
                  {group.group}
                </div>
                {group.items.map((item) => (
                  <a
                    key={item}
                    href="/catalog/shop"
                    className="block px-3 py-1.5 text-sm text-gray-700 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                  >
                    {item}
                  </a>
                ))}
              </div>
            ))}
          </nav>
          <div className="mt-4 pt-4 border-t border-green-100">
            <a href="/catalog/shop">
              <Button className="w-full rounded-xl" style={{ background: 'linear-gradient(135deg, #b8860b, #daa520)', color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,0.3)', boxShadow: '0 0 12px rgba(218,165,32,0.35)' }}>
                Перейти в магазин
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ─── Hero Slider ─── */
function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(
    () => setCurrent((p) => (p + 1) % HERO_SLIDES.length),
    []
  );
  const prev = useCallback(
    () => setCurrent((p) => (p - 1 + HERO_SLIDES.length) % HERO_SLIDES.length),
    []
  );

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slide = HERO_SLIDES[current];

  return (
    <section className="relative overflow-hidden bg-green-900 min-h-[500px] md:min-h-[600px] flex items-center">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={slide.img}
          alt=""
          className="w-full h-full object-cover opacity-30 scale-110"
        />
        <div className="absolute inset-0 hero-gradient" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 right-10 text-green-400/10 animate-leaf">
        <Leaf className="w-32 h-32" />
      </div>
      <div className="absolute bottom-10 left-10 text-green-400/10 animate-float">
        <TreePine className="w-24 h-24" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 md:py-24 w-full">
        <div className="max-w-2xl">
          <Badge className="bg-green-400/20 text-green-200 border-green-400/30 mb-4 text-sm">
            <Sprout className="w-3.5 h-3.5 mr-1" />
            Питомник с 2009 года
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6 whitespace-pre-line">
            {slide.title}
          </h1>
          <p className="text-lg md:text-xl text-green-100 mb-8 leading-relaxed">
            {slide.subtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <a href={slide.ctaLink}>
              <Button
                size="lg"
                className="bg-green-500 hover:bg-green-400 text-white rounded-xl px-8 text-base gap-2 shadow-lg shadow-green-900/30"
              >
                {slide.cta}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
            <a href="tel:+79018887385">
              <Button
                size="lg"
                variant="outline"
                className="border-green-400/50 text-green-100 hover:bg-green-800/50 rounded-xl px-8 text-base gap-2"
              >
                <Phone className="w-4 h-4" />
                Позвонить
              </Button>
            </a>
          </div>
        </div>

        {/* Slider controls */}
        <div className="absolute bottom-8 right-8 flex items-center gap-3">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors backdrop-blur-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === current
                    ? "bg-green-400 w-8"
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors backdrop-blur-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── Features Hero ─── */
function Features() {
  return (
    <section className="relative bg-green-900 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/hero-bg.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-4 pb-16 md:pb-20 w-full">
        <div className="text-center mb-8">
          <Badge className="bg-green-400/20 border-green-400/30 mb-4 text-sm" style={{ color: '#daa520', textShadow: '0 0 5px rgba(218, 165, 32, 0.35)' }}>
            <Sprout className="w-3.5 h-3.5 mr-1" />
            У Захара
          </Badge>
          <h4 className="text-4xl md:text-6xl font-bold mb-4 leading-tight" style={{ color: '#bbf7d0', textShadow: '0 0 6px rgba(187, 247, 208, 0.3)' }}>
            Рассада, саженцы, посадки
          </h4>
          <p className="text-lg md:text-xl max-w-2xl mx-auto" style={{ color: '#bbf7d0' }}>
            Всё для вашего сада — от рассады до хвойных. Установка и ремонт, теплиц, покос газонов, заборы, дорожки, оформление газонов, ландшафтный дизайн, земляные работы и ремонт. Доставка, гарантии, поддержка.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="feature-card group flex flex-col items-center text-center p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 hover:border-white/20 transition-all duration-300"
            >
              <div className="feature-icon w-16 h-16 rounded-2xl bg-green-400/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <f.icon className="w-8 h-8 text-green-300" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">{f.title}</h3>
              <p className="text-green-200 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="#catalog">
            <Button
              size="lg"
              className="rounded-xl px-8 gap-2"
              style={{ background: 'linear-gradient(135deg, #b8860b, #daa520)', color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,0.3)', boxShadow: '0 0 12px rgba(218,165,32,0.35)' }}
            >
              Перейти в каталог
              <ArrowRight className="w-4 h-4" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Catalog Section ─── */
function CatalogSection() {
  return (
    <section id="catalog" className="py-16 md:py-24 bg-gradient-to-b from-green-50/50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <Badge
            variant="outline"
            className="border-green-300 text-green-700 mb-4"
          >
            <Flower2 className="w-3.5 h-3.5 mr-1" />
            Каталог
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
            Наши растения
          </h2>
          <p className="text-green-600 max-w-2xl mx-auto">
            Более 10 000 наименований — от хризантем и роз до хвойных саженцев.
            Выберите категорию и найдите идеальное растение для вашего сада.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {CATEGORIES.map((cat) => (
            <a
              key={cat.slug}
              href={`/catalog${cat.slug}`}
              className="category-card group"
            >
              <Card className="overflow-hidden border-green-100 hover:border-green-300 bg-white rounded-2xl h-full">
                <div className="aspect-square overflow-hidden bg-green-50">
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="category-img w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-3 md:p-4">
                  <h3 className="font-medium text-sm text-green-900 group-hover:text-green-700 transition-colors leading-snug line-clamp-2">
                    {cat.name}
                  </h3>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="/catalog/shop">
            <Button
              variant="outline"
              size="lg"
              className="border-green-300 text-green-700 hover:bg-green-50 rounded-xl gap-2"
            >
              Весь каталог
              <ArrowRight className="w-4 h-4" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Featured Products ─── */
function FeaturedProducts() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <Badge
            variant="outline"
            className="border-amber-300 text-amber-700 mb-4"
          >
            <Star className="w-3.5 h-3.5 mr-1" />
            Выбор покупателей
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
            Популярные товары
          </h2>
          <p className="text-green-600 max-w-2xl mx-auto">
            Самые востребованные растения нашего питомника, проверенные временем
            и любимые тысячами садоводов Струнино, Александрова, Сергиева Посада и окрестностей.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {FEATURED_PRODUCTS.map((product) => (
            <a
              key={product.slug}
              href={`/catalog${product.slug}`}
              className="product-card group"
            >
              <Card className="overflow-hidden border-green-100 hover:border-green-300 bg-white rounded-2xl h-full">
                <div className="relative aspect-square overflow-hidden bg-green-50">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {product.badge && (
                    <Badge
                      className={`absolute top-3 left-3 ${
                        product.badge === "Акция"
                          ? "bg-red-500"
                          : product.badge === "Новинка"
                          ? "bg-amber-500"
                          : "bg-green-600"
                      } text-white border-0`}
                    >
                      {product.badge}
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium text-sm text-green-900 mb-2 line-clamp-2 leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-base font-bold text-green-700">
                    {product.price}
                  </p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── About Section ─── */
function AboutSection() {
  return (
    <section className="py-16 md:py-24 bg-green-900 text-white relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 text-green-800/30">
        <TreePine className="w-64 h-64" />
      </div>
      <div className="absolute bottom-0 left-0 text-green-800/30">
        <Flower2 className="w-48 h-48" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="bg-green-400/20 text-green-200 border-green-400/30 mb-4">
              <Leaf className="w-3.5 h-3.5 mr-1" />
              О питомнике
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
              У Захара — ваш надёжный партнёр в мире растений
            </h2>
            <p className="text-green-100 text-lg leading-relaxed mb-6">
              С 2009 года мы выращиваем и продаём саженцы, рассаду и
              декоративные растения для садоводов и ландшафтных дизайнеров по
              всей России. Наш питомник в Москве — это более 10 000
              наименований растений, профессиональная агрономическая команда и
              индивидуальный подход к каждому клиенту.
            </p>
            <p className="text-green-100 text-lg leading-relaxed mb-8">
              Мы гордимся тем, что наши растения приживаются и радуют своих
              владельцев годами. Каждое растение проходит фитосанитарный
              контроль и проверку сорта перед отправкой.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-green-400/20 flex items-center justify-center shrink-0">
                  <Sprout className="w-6 h-6 text-green-300" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-300">10 000+</div>
                  <div className="text-green-200 text-sm">Наименований</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-green-400/20 flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6 text-green-300" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-300">50 000+</div>
                  <div className="text-green-200 text-sm">Клиентов</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-green-400/20 flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6 text-green-300" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-300">15+ лет</div>
                  <div className="text-green-200 text-sm">Опыта работы</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-green-400/20 flex items-center justify-center shrink-0">
                  <Truck className="w-6 h-6 text-green-300" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-300">89</div>
                  <div className="text-green-200 text-sm">Регионов доставки</div>
                </div>
              </div>
            </div>

            <a href="/catalog/shop">
              <Button
                size="lg"
                className="bg-green-500 hover:bg-green-400 text-white rounded-xl gap-2"
              >
                Подробнее о нас
                <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
          </div>

          {/* Image collage */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://agrodecor.ru/thumb/2/bBlk-I2iEf7F1j6MorYLwQ/160c145/d/gortenziya_metelchataya_vanilla_freyz.jpg"
                  alt="Гортензии"
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://agrodecor.ru/thumb/2/vjyIeA34szCSipDgKr-_Eg/160c145/d/khvoyniki.jpg"
                  alt="Хвойные"
                  className="w-full h-32 object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://agrodecor.ru/thumb/2/e6fNDDfvVZMsD8IcfAJHdg/160c145/d/selebriti.jpg"
                  alt="Пионы"
                  className="w-full h-32 object-cover"
                  loading="lazy"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://agrodecor.ru/thumb/2/cbESZfLOvjeBHN160YSweQ/160c145/d/roza_muskusnaya.jpg"
                  alt="Розы"
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA Section ─── */
function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-xl border border-green-100 p-8 md:p-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center mx-auto mb-6">
            <Sun className="w-8 h-8 text-green-700" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
            Готовы украсить свой сад?
          </h2>
          <p className="text-green-600 max-w-2xl mx-auto mb-8 text-lg">
            Закажите саженцы прямо сейчас и получите бесплатную консультацию
            нашего агронома по уходу за растениями. Доставка по Струнино, Александрову, Сергиеву Посаду и окрестностям.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/catalog/shop">
              <Button
                size="lg"
                className="bg-green-700 hover:bg-green-800 text-white rounded-xl px-8 gap-2"
              >
                Перейти в магазин
                <ShoppingCart className="w-4 h-4" />
              </Button>
            </a>
            <a href="tel:+79018887385">
              <Button
                size="lg"
                variant="outline"
                className="border-green-300 text-green-700 hover:bg-green-50 rounded-xl px-8 gap-2"
              >
                <Phone className="w-4 h-4" />
                +7 (901) 888-73-85
              </Button>
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-green-600">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Бесплатная доставка от 5 000 ₽
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Гарантия приживаемости
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Скидки на опт
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="bg-green-950 text-green-100">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo.png"
                alt="У Захара"
                className="h-12 w-12 rounded-xl object-cover"
                style={{ filter: 'drop-shadow(0 0 5px rgba(218, 165, 32, 0.5))' }}
              />
              <div>
                <div className="text-xl font-bold" style={{ color: '#daa520', textShadow: '0 0 5px rgba(218, 165, 32, 0.35)' }}>У Захара</div>
                <div className="text-xs text-green-400">Рассада, саженцы, посадки</div>
              </div>
            </div>
            <p className="text-green-300 text-sm leading-relaxed mb-4">
              Интернет-магазин саженцев и растений с доставкой по Струнино, Александрову, Сергиеву Посаду и окрестностям.
              Собственный питомник в Москве. Опыт работы более 10 лет.
            </p>
            <div className="flex gap-3">
              <a
                href="https://vk.com/agrodecor"
                className="w-9 h-9 rounded-lg bg-green-800 hover:bg-green-700 flex items-center justify-center transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/agrodecor"
                className="w-9 h-9 rounded-lg bg-green-800 hover:bg-green-700 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Catalog */}
          <div>
            <h3 className="font-semibold text-white mb-4">Каталог</h3>
            <ul className="space-y-2">
              {[
                "Хризантема мультифлора",
                "Рассада овощей",
                "Рассада цветов",
                "Многолетние цветы",
                "Пионы",
                "Саженцы Роз",
                "Гортензии",
                "Клематисы",
                "Хвойные саженцы",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="/catalog/shop"
                    className="text-sm text-green-300 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-semibold text-white mb-4">Информация</h3>
            <ul className="space-y-2">
              {[
                "О компании",
                "Доставка и оплата",
                "Оптовикам",
                "Гарантии",
                "Отзывы",
                "Акции",
                "Контакты",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="/catalog/shop"
                    className="text-sm text-green-300 hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="font-semibold text-white mb-4">Контакты</h3>
            <div className="space-y-3">
              <a
                href="tel:+79018887385"
                className="flex items-center gap-2 text-sm text-green-300 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 shrink-0" />
                +7 (901) 888-73-85
              </a>
              <a
                href="mailto:rassadim@ya.ru"
                className="flex items-center gap-2 text-sm text-green-300 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 shrink-0" />
                rassadim@ya.ru
              </a>
              <div className="flex items-start gap-2 text-sm text-green-300">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                601605, Владимирская обл., Александровский р-н, д. Лизуново, Лесная ул., 31
              </div>
              <div className="flex items-center gap-2 text-sm text-green-300">
                <Clock className="w-4 h-4 shrink-0" />
                Пн-Пт 9:00-18:00
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-green-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-green-400">
            У Захара &copy; 2009 — 2026. Продажа саженцев в интернет-магазине.
          </p>
          <div className="flex gap-4">
            <a
              href="/catalog/politika-konfidencialnosti"
              className="text-xs text-green-400 hover:text-green-200 transition-colors"
            >
              Политика конфиденциальности
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Main Page ─── */
export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Features />
        <CatalogSection />
        <FeaturedProducts />
        <AboutSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
